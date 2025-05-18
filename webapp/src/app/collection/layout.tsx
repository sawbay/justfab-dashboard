import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JustFAB - Collection",
  description: "Make predictions and earn rewards on JustFAB platform",
};

export default function PredictionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
