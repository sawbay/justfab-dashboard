import { useEffect, useState } from "react";
import { Account, Client, Models } from "appwrite";
import getClient from "@/utils/appwrite/client";

export function useAppwrite() {
  const [client, setClient] = useState<Client | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [session, setSession] = useState<Models.Session | null>(null);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

  const telegramAuthenticated = async (jwt: string, tempSessionId: string) => {
    const client = getClient()
      .setJWT(jwt)
      .setSession(tempSessionId);
    setClient(client);

    const account = new Account(client);
    setAccount(account);

    const session = await account.getSession(tempSessionId);
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
