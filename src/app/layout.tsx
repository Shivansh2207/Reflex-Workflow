import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { OfflineBanner } from "@/components/shared/OfflineBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
export const metadata: Metadata = { title: { default: "Reflex Workspace", template: "%s · Reflex Workspace" }, description: "Internal work coordination for Reflex Reality LLP", manifest: "/manifest.webmanifest", applicationName: "Reflex Workspace", appleWebApp: { capable: true, title: "Reflex Workspace", statusBarStyle: "black-translucent" } };
export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f5f8fa" }, { media: "(prefers-color-scheme: dark)", color: "#0b1117" }], width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={inter.variable}><AppProviders><OfflineBanner />{children}</AppProviders></body></html>;
}
