import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import { ReviewProvider } from "@/contexts/ReviewContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HealthPlus Pharmacy - Your Trusted Healthcare Partner",
  description:
    "Professional pharmacy services with a wide range of medicines, health products, and expert consultation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ReviewProvider>
            {children}
            <Toaster richColors />
          </ReviewProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
