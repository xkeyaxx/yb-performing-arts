import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "YB Performing Arts | Every Story Deserves a Stage",
  description: "Discover performances, meet the community, and find your place at YB Performing Arts.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}
