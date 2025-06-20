import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata("Lottery");

export default function LotteryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
