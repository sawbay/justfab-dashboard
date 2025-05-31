import "./globals.css";

import type { PropsWithChildren } from "react";
import { getLocale } from "next-intl/server";
import { I18nProvider } from "@/core/i18n/provider";
import Providers from "@/components/providers/FvProvider";
import { createMetadata } from "@/constants/metadata";

export const metadata = createMetadata("Dashboard");

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <I18nProvider>
          <Providers>{children}</Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
