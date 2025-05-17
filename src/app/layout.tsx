import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { I18nProvider } from '@/core/i18n/provider';

import 'normalize.css/normalize.css';
import './globals.css';
import FPProvider from '@/components/providers/FPProvider';
// import { Root } from '@/components/root/Root';
import AuthProvider from '@/components/providers/AuthProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import Providers from '@/components/providers/FvProvider';

export const metadata: Metadata = {
  title: 'JustFAB',
  description: 'Your application description goes here',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();
  const session = await getServerSession(authOptions);

  return (
    <html lang={locale}>
      <body>
        <I18nProvider>
          {/* <Root> */}
          <AuthProvider>
            {/* <FPProvider>{children}</FPProvider> */}
            <Providers>{children}</Providers>
          </AuthProvider>
          {/* </Root> */}
        </I18nProvider>
      </body>
    </html>
  );
}
