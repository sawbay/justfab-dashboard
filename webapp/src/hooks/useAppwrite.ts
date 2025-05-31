import { useEffect, useState } from "react";
import { Account, Client, Models } from "appwrite";
import getClient from "@/utils/appwrite/client";

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

  return { client, account, session, user, telegramAuthenticated, logoutSession };
}
