import type { PropsWithChildren } from "react";
import { getLocale } from "next-intl/server";
import { I18nProvider } from "@/core/i18n/provider";
import AuthProvider from "@/components/providers/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Providers from "@/components/providers/FvProvider";
import { createMetadata } from "@/constants/metadata";
import "normalize.css/normalize.css";
import "./globals.css";

export const metadata = createMetadata("Dashboard");

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();
  const session = await getServerSession(authOptions);

  return (
    <html lang={locale}>
      <body>
        <I18nProvider>
          <AuthProvider>
            <Providers>{children}</Providers>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
