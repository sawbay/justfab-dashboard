'use client';

import { FutureverseAuthProvider, FutureverseWagmiProvider } from '@futureverse/auth-react';
import { type ThemeConfig, AuthUiProvider, DefaultTheme } from '@futureverse/auth-ui';
import React from 'react';
import { State } from 'wagmi';
import { authClient, getWagmiConfig, queryClient } from './config';
import { QueryClientProvider } from '@tanstack/react-query';

const customThemeConfig: ThemeConfig = {
  ...DefaultTheme,
  defaultAuthOption: 'web3',
};

export default function Providers({ children, initialWagmiState }: { children: React.ReactNode; initialWagmiState?: State }) {
  return (
    <QueryClientProvider client={queryClient}>
      <FutureverseWagmiProvider getWagmiConfig={getWagmiConfig} initialState={initialWagmiState}>
        <FutureverseAuthProvider authClient={authClient}>
          <AuthUiProvider themeConfig={customThemeConfig} authClient={authClient}>
            {children}
          </AuthUiProvider>
        </FutureverseAuthProvider>
      </FutureverseWagmiProvider>
    </QueryClientProvider>
  );
}