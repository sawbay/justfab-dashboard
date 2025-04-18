import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { Root } from '@/components/Root/Root';
import { I18nProvider } from '@/core/i18n/provider';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';
import { FutureverseAuthProvider } from '@futureverse/auth-react';
import { FutureverseAuthClient } from '@futureverse/auth-react/auth';
import { AuthUiProvider, DefaultTheme, ThemeConfig } from '@futureverse/auth-ui';

export const metadata: Metadata = {
  title: 'Your Application Title Goes Here',
  description: 'Your application description goes here',
};

const authClient = new FutureverseAuthClient({
  clientId: process.env.NEXT_PUBLIC_FUTUREVERSE_CLIENT_ID!,
  environment: 'development',
  redirectUri: 'https://fpint.vercel.app',
});

const customThemeConfig: ThemeConfig = {
  ...DefaultTheme,
  defaultAuthOption: 'web3',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <I18nProvider>
          <Root>
            <FutureverseAuthProvider authClient={authClient}>
              <AuthUiProvider themeConfig={customThemeConfig} authClient={authClient}>
                {children}
              </AuthUiProvider>
            </FutureverseAuthProvider>
          </Root>
        </I18nProvider>
      </body>
    </html>
  );
}
