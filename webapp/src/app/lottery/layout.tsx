import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JustFAB - Lottery",
  description: "Play lottery and win big prizes on JustFAB platform",
};

export default function LotteryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
