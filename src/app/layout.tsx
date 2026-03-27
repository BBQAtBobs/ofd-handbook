import type { Metadata } from "next";
import { Lexend, Inter, IBM_Plex_Mono } from "next/font/google";
import AnalyticsProviders from "@/components/Analytics";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "OFD Handbook — Oakland Fire Department Recruit Resource",
  description:
    "The complete interactive field reference for Oakland Fire Department recruits. Study smarter, look it up faster, know your department.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lexend.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-primary font-body">
        <AnalyticsProviders>{children}</AnalyticsProviders>
      </body>
    </html>
  );
}
