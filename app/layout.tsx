import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://tarranteng.co.uk"),
  title: {
    default: "D&TA Health & Safety Training | Tarrant Engineering",
    template: "%s | Tarrant Engineering",
  },
  description: "D&TA-accredited health and safety training for school Design & Technology departments across Hampshire and southern England.",
  applicationName: "Tarrant Engineering",
  authors: [{ name: "Simon Tarrant", url: "/about/" }],
  creator: "Simon Tarrant",
  publisher: "Tarrant Engineering Limited",
  category: "education",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Tarrant Engineering",
    title: "D&TA Health & Safety Training | Tarrant Engineering",
    description: "D&TA-accredited health and safety training for school Design & Technology departments across Hampshire and southern England.",
    images: [{
      url: "/workshop-training.jpg",
      alt: "Practical Design and Technology workshop training",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "D&TA Health & Safety Training | Tarrant Engineering",
    description: "D&TA-accredited health and safety training for school Design & Technology departments across Hampshire and southern England.",
    images: ["/workshop-training.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/tarrant-favicon.svg",
    shortcut: "/tarrant-favicon.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tarranteng.co.uk/#organization",
      name: "Tarrant Engineering",
      legalName: "Tarrant Engineering Limited",
      url: "https://tarranteng.co.uk/",
      logo: "https://tarranteng.co.uk/tarrant-engineering-logo.png",
      email: "simon@tarranteng.co.uk",
      telephone: "+44 7704 910521",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "UK company number",
        value: "06009054",
      },
      address: {
        "@type": "PostalAddress",
        addressRegion: "Hampshire",
        addressCountry: "GB",
      },
    },
    {
      "@type": "Person",
      "@id": "https://tarranteng.co.uk/about/#simon-tarrant",
      name: "Simon Tarrant",
      url: "https://tarranteng.co.uk/about/",
      image: "https://tarranteng.co.uk/simon-tarrant.png",
      jobTitle: "Managing Director and Registered D&T Health & Safety Consultant",
      worksFor: { "@id": "https://tarranteng.co.uk/#organization" },
      sameAs: [
        "https://www.designtechnology.org.uk/consultant-directory/consultants/simon-tarrant/",
      ],
    },
    {
      "@type": "Service",
      "@id": "https://tarranteng.co.uk/#dta-training",
      name: "D&TA-accredited Design and Technology health and safety training",
      serviceType: "On-site health and safety training for school Design and Technology departments",
      provider: { "@id": "https://tarranteng.co.uk/#organization" },
      areaServed: [
        "Hampshire",
        "Dorset",
        "Wiltshire",
        "Berkshire",
        "Surrey",
        "West Sussex",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://tarranteng.co.uk/#website",
      url: "https://tarranteng.co.uk/",
      name: "Tarrant Engineering",
      inLanguage: "en-GB",
      publisher: { "@id": "https://tarranteng.co.uk/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
