import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { I18nProvider } from '@/core/i18n/provider';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './globals.css';
import Providers from '@/components/providers/Providers';
import { Root } from '@/components/root/Root';

export const metadata: Metadata = {
  title: 'JustFAB',
  description: 'Your application description goes here',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <I18nProvider>
          <Root>
            <Providers>{children}</Providers>
          </Root>
        </I18nProvider>
      </body>
    </html>
  );
}
