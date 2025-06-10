import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata("Store");

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
