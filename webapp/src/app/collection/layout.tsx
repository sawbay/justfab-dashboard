import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata("Collection");

export default function PredictionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
