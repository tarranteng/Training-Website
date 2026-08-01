import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D&TA Training Quote Builder",
  description: "Select courses, delegate numbers and timings to estimate training days and request a tailored quote for D&TA-accredited school D&T health and safety training.",
  alternates: { canonical: "/quote-builder/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Tarrant Engineering",
    url: "/quote-builder/",
    title: "D&TA Training Quote Builder | Tarrant Engineering",
    description: "Select courses, delegate numbers and timings to estimate training days and request a tailored quote for school D&T health and safety training.",
    images: [{
      url: "/standard-workshop.jpg",
      alt: "Workshop equipment used in Design and Technology training",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "D&TA Training Quote Builder | Tarrant Engineering",
    description: "Estimate training days and request a tailored quote for D&TA-accredited school D&T health and safety training.",
    images: ["/standard-workshop.jpg"],
  },
};

export default function QuoteBuilderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
