import "./globals.css";

import type { PropsWithChildren } from "react";
import { getLocale } from "next-intl/server";
import { I18nProvider } from "@/core/i18n/provider";
import Providers from "@/core/providers/FvProvider";
import { createMetadata } from "@/utils/metadata";
import { AppwriteProvider } from "@/core/providers/AppwriteProvider";

export const metadata = createMetadata("Dashboard");

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <AppwriteProvider>
          <I18nProvider>
            <Providers>{children}</Providers>
          </I18nProvider>
        </AppwriteProvider>
      </body>
    </html>
  );
}
