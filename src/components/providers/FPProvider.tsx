'use client';

import { FutureverseAuthProvider, FutureverseWagmiProvider } from '@futureverse/auth-react';
import { type ThemeConfig, AuthUiProvider, DefaultTheme } from '@futureverse/auth-ui';
import React from 'react';
import { State } from 'wagmi';
import { authClient, getWagmiConfig } from './config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TrnApiProvider } from '@futureverse/transact-react';

const customThemeConfig: ThemeConfig = {
  ...DefaultTheme,
  defaultAuthOption: 'web3',
};

import type { NetworkName } from '@therootnetwork/api';
import { PUBLIC_NETWORK } from '@/utils/env';

const network = (PUBLIC_NETWORK ?? 'porcini') as
  | NetworkName
  | undefined;

export default function FPProvider({ children, initialWagmiState }: { children: React.ReactNode; initialWagmiState?: State }) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <TrnApiProvider network={network}>
        <FutureverseWagmiProvider getWagmiConfig={getWagmiConfig} initialState={initialWagmiState}>
          <FutureverseAuthProvider authClient={authClient}>
            <AuthUiProvider themeConfig={customThemeConfig} authClient={authClient}>
              {children}
            </AuthUiProvider>
          </FutureverseAuthProvider>
        </FutureverseWagmiProvider>
      </TrnApiProvider>
    </QueryClientProvider>
  );
}
