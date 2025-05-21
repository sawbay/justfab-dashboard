import { createMetadata } from "@/constants/metadata";

export const metadata = createMetadata("Store");

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
