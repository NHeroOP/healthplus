import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Provider } from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

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
      <body className={`h-screen ${inter.className}`}>
        <Provider>
          {children}
          <Toaster richColors />
        </Provider>
      </body>
    </html>
  );
}
