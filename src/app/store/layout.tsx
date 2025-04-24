import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JustFAB - Store",
  description: "Shop exclusive items and NFTs on JustFAB marketplace",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
