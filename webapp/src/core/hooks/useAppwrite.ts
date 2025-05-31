import { useEffect, useState } from "react";
import { Account, Client, Databases, Models, Permission, Query, Role } from "appwrite";
import getClient from "@/utils/appwrite/client";
import { DATABASE_ID, INVENTORY_COL_ID, USER_FUTUREPASS_COL_ID } from "@/utils/appwrite/const";
import { ItemType } from "@/types/item_types";

export function useAppwrite() {
  const [client, setClient] = useState<Client | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [session, setSession] = useState<Models.Session | null>(null);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
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
      fetchInventory();
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
    const databases = new Databases(client!);
    return await databases.createDocument(
      DATABASE_ID,
      USER_FUTUREPASS_COL_ID,
      user!.$id,
      {
        userId: user!.$id,
        futurepass,
      },
      [
        Permission.read(Role.any()),
        Permission.write(Role.user(user!.$id)),
        Permission.delete(Role.user(user!.$id)),
        Permission.update(Role.user(user!.$id)),
      ]
    );
  }

  const fetchInventory = async () => {
    const databases = new Databases(client!);
    const inventory = await databases.listDocuments(
      DATABASE_ID,
      INVENTORY_COL_ID,
      [
        Query.equal("userId", user!.$id),
        Query.equal("used", false),
      ]
    );

    setTreasureChestTotal(inventory.documents.filter(item => item.itemType === ItemType.WELCOME_CHEST).length);
    setAuraKeyTotal(inventory.documents.filter(item => item.itemType === ItemType.AURA_KEY).length);
  }

  return {
    client,
    account,
    session,
    user,
    telegramAuthenticated,
    logoutSession,
    linkFuturepass,
    treasureChestTotal,
    auraKeyTotal,
  };
}
