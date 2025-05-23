import { createMetadata } from "@/constants/metadata";

export const metadata = createMetadata("Collection");

export default function PredictionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
