import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import type React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen dark:bg-zinc-900  flex justify-between flex-col">
      <Navigation />

      <div className="dark:bg-zinc-900">
        {children}  
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}
