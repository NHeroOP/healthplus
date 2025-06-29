import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { CartProvider } from "@/contexts/CartContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { ReviewProvider } from "@/contexts/ReviewContext"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HealthPlus Pharmacy - Your Trusted Healthcare Partner",
  description:
    "Professional pharmacy services with a wide range of medicines, health products, and expert consultation.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <ReviewProvider>
              <CartProvider>
                {children}
                <Toaster />
              </CartProvider>
            </ReviewProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
