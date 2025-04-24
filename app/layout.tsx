import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Commissioner, Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";
import { geistSans } from "./fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Stratum",
  description: "Stratum is an AI-powered platform for crafting and sharing actionable software project guides. Built with developers in mind, it combines structured editing with conversational AI to help users design, refine, and explore project roadmaps tailored to their experience and goals.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={geistSans.className} suppressHydrationWarning>
        <body className="bg-background text-foreground">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen h-[100svh] md:h-fit flex flex-col items-center">
              <div className="flex-1 w-full flex flex-col items-center">
                <NavBar />
                <div className="w-[100dvw] md:w-full h-full flex flex-col gap-20 py-2">
                  {children}
                </div>

                <Footer />
              </div>
            </main>
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
