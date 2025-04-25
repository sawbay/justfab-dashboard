import { FUTUREVERSE_CLIENT_ID, FUTUREVERSE_ENVIRONMENT, FUTUREVERSE_REDIRECT_URI, WALLET_CONNECT_PROJECT_ID } from "@/utils/env";
import { Environment, FutureverseAuthClient } from "@futureverse/auth-react/auth";
import { createWagmiConfig } from "@futureverse/auth-react/wagmi";
import { QueryClient } from "@tanstack/react-query";
import { cookieStorage, createStorage } from "wagmi";

export const authClient = new FutureverseAuthClient({
  clientId: FUTUREVERSE_CLIENT_ID,
  environment: FUTUREVERSE_ENVIRONMENT as Environment,
  redirectUri: FUTUREVERSE_REDIRECT_URI,
  signInFlow: 'redirect',
  userStore: localStorage,
  stateStore: localStorage,
});

export const queryClient = new QueryClient();

export const getWagmiConfig = async () => {
  return createWagmiConfig({
    walletConnectProjectId: WALLET_CONNECT_PROJECT_ID,
    // xamanAPIKey,
    authClient,
    // Optional if supporting SSR
    ssr: true,
    // Optional chains you wish to support
    // chains: [mainnet, sepolia, polygonAmoy],
    // Optional if supporting SSR
    storage: createStorage({
      storage: cookieStorage,
    }),
  });
};