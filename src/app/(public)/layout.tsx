"use client"

import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import { useAuthStore } from "@/store/Auth"
import type React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const { hydrated } = useAuthStore()
  
  if (!hydrated) {
    return (
      <div className="min-h-screen dark:bg-zinc-900 flex justify-center items-center">
        <div className="text-lg text-gray-500 dark:text-gray-400">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen dark:bg-zinc-900  flex flex-col">
      <Navigation />

      {/* <div className="dark:bg-zinc-900 h-full "> */}
        {children}  
      {/* </div> */}

      {/* <div>
        <Footer />
      </div> */}
    </div>
  )
}
