import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training Quote Builder",
  description: "Build a structured D&TA training plan, calculate estimated training days and request a formal quotation.",
};

export default function QuoteBuilderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
