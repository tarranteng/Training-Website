import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

export const metadata: Metadata = {
  title: {
    default: "Tarrant Engineering | D&TA Health & Safety Training",
    template: "%s | Tarrant Engineering",
  },
  description: "D&TA accredited Design and Technology health and safety training for schools across Hampshire and the South of England.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
