import { useEffect, useState } from "react";
import { Account, Client, Databases, Models, Permission, Role } from "appwrite";
import getClient from "@/utils/appwrite/client";
import { DATABASE_ID, USER_FUTUREPASS_COL_ID } from "@/utils/appwrite/const";

export function useAppwrite() {
  const [client, setClient] = useState<Client | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [session, setSession] = useState<Models.Session | null>(null);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

  useEffect(() => {
    if (client == null) {
      initClient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    await databases.createDocument(
      DATABASE_ID,
      USER_FUTUREPASS_COL_ID,
      user!.$id,
      {
        userId: user!.$id,
        futurepass,
      },
      [
        Permission.read(Role.user(user!.$id)),
        Permission.write(Role.user(user!.$id)),
        Permission.delete(Role.user(user!.$id)),
        Permission.update(Role.user(user!.$id)),
      ]
    );
  }

  return {
    client,
    account,
    session,
    user,
    telegramAuthenticated,
    logoutSession,
    linkFuturepass
  };
}
