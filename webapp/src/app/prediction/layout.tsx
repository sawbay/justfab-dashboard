import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata("Prediction");

export default function PredictionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
