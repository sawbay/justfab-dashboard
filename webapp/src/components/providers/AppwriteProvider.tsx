"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Account, Client, Databases, ExecutionMethod, Functions, Models, Permission, Query, Role } from "appwrite";
import getClient from "@/utils/appwrite/client";
import { ItemType } from "@/types/item_types";
import { DATABASE_ID, FUNCTION_ID, INVENTORY_COL_ID, USER_COL_ID } from "@/utils/env";
import { WorkerEvent } from "@/utils/worker";

export interface FetchInventoryOptions {
  used?: boolean;
  itemTypes?: ItemType[];
}

interface AppwriteContextProps {
  client: Client | null;
  account: Account | null;
  user: Models.User<Models.Preferences> | null;
  userDetail: Models.Document | null;
  session: Models.Session | null;
  treasureChestTotal: number;
  auraKeyTotal: number;

  fetchInventory: (options: FetchInventoryOptions) => Promise<Models.DocumentList<Models.Document>>;
  telegramAuthenticated: (userId: string, secret: string) => Promise<void>;
  logoutSession: () => Promise<void>;
  linkFuturepass: (futurepass: string) => Promise<void>;
  fireEvent: (event: WorkerEvent) => Promise<void>;
}

const AppwriteContext = createContext<AppwriteContextProps | undefined>(undefined);

export function useAppwrite() {
  const context = useContext(AppwriteContext);
  if (context === undefined) {
    throw new Error("useAppwrite must be used within an AppwriteProvider");
  }
  return context;
}

export default AppwriteContext;

export const AppwriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [session, setSession] = useState<Models.Session | null>(null);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [userDetail, setUserDetail] = useState<Models.Document | null>(null);
  const [inventory, setInventory] = useState<Models.Document[]>([]);
  const [treasureChestTotal, setTreasureChestTotal] = useState<number>(0);
  const [auraKeyTotal, setAuraKeyTotal] = useState<number>(0);

  useEffect(() => {
    if (client == null) {
      initClient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user != null) {
      fetchUserDetail();
      fetchTreasureChest();
      fetchAuraKey();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const initClient = async () => {
    const client = getClient();
    setClient(client);
    const account = new Account(client);
    setAccount(account);

    try {
      const session = await account.getSession('current');
      setSession(session);
    } catch (error) {
      setSession(null);
    }

    try {
      const user = await account.get();
      setUser(user);
    } catch (error) {
      setUser(null);
    }
  }

  const fetchUserDetail = async () => {
    const databases = new Databases(client!);
    const userDetail = await databases.getDocument(
      DATABASE_ID,
      USER_COL_ID,
      user!.$id,
    );
    setUserDetail(userDetail);
  }

  const fetchTreasureChest = async () => {
    const databases = new Databases(client!);
    const res = await databases.listDocuments(
      DATABASE_ID,
      INVENTORY_COL_ID,
      [
        Query.equal("userId", user!.$id),
        Query.equal("itemType", ItemType.CHEST),
        Query.equal("used", false),
      ]
    );
    setTreasureChestTotal(res.total);
  }

  const fetchAuraKey = async () => {
    const databases = new Databases(client!);
    const res = await databases.listDocuments(
      DATABASE_ID,
      INVENTORY_COL_ID,
      [
        Query.equal("userId", user!.$id),
        Query.equal("itemType", ItemType.AURA_KEY),
        Query.equal("used", false),
      ]
    );
    setAuraKeyTotal(res.total);
  }

  const telegramAuthenticated = async (userId: string, secret: string) => {
    const client = getClient()
    setClient(client);

    const account = new Account(client);
    setAccount(account);

    const session = await account.createSession(userId, secret);
    setSession(session);

    const user = await account.get();
    setUser(user);
  }

  const logoutSession = async () => {
    await account!.deleteSession(session!.$id);
    setSession(null);
    setUser(null);
    setClient(null);
    setAccount(null);
  }

  const linkFuturepass = async (futurepass: string) => {
    const { responseStatusCode, responseBody } = await proxiedApi(
      "api/appwrite/users/link_futurepass",
      ExecutionMethod.POST,
      {
        futurepass,
      }
    );
  }

  const fireEvent = async (event: WorkerEvent) => {
    const { responseStatusCode, responseBody } = await proxiedApi(
      "api/appwrite/worker_events",
      ExecutionMethod.POST,
      {
        event,
      }
    );
  }

  const fetchInventory = async (options: FetchInventoryOptions) => {
    const databases = new Databases(client!);

    const queries = [Query.equal("userId", user!.$id)];
    if (options.used) {
      queries.push(Query.equal("used", options.used));
    }
    if (options.itemTypes) {
      queries.push(Query.or(options.itemTypes.map(itemType => Query.equal("itemType", itemType))));
    }

    return await databases.listDocuments(
      DATABASE_ID,
      INVENTORY_COL_ID,
      queries
    );
  }

  const proxiedApi = async (path: string, method: ExecutionMethod, body: any): Promise<{ responseStatusCode: number, responseBody: any }> => {
    const functions = new Functions(client!);
    const response = await functions.createExecution(
      FUNCTION_ID,
      JSON.stringify(body),
      false,
      path,
      method,
      {
        "Content-Type": "application/json",
      }
    );

    const responseStatusCode = response.responseStatusCode;
    const responseBody = JSON.parse(response.responseBody);

    console.log(`api: ${path} status: ${responseStatusCode} body: `, responseBody);
    return {
      responseStatusCode,
      responseBody,
    }
  }

  return (
    <AppwriteContext.Provider value={{
      client,
      account,
      session,
      user,
      userDetail,
      treasureChestTotal,
      auraKeyTotal,
      telegramAuthenticated,
      fetchInventory,
      logoutSession,
      linkFuturepass,
      fireEvent,
    }}>
      {children}
    </AppwriteContext.Provider>
  )
}
