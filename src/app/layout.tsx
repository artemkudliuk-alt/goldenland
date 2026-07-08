import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { LeadModalProvider } from "@/context/LeadModalContext";
import { ContactsProvider } from "@/context/ContactsContext";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Golden Land Property Investment",
  description:
    "Premium residential, commercial and hotel property investments in Ukraine and globally.",
  icons: {
    icon: "/seo/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LanguageProvider>
          <ContactsProvider>
            <LeadModalProvider>
              {children}
            </LeadModalProvider>
          </ContactsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
