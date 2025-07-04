"use client"

import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import { CART_COOKIE } from "@/const"
import { useAuthStore } from "@/store/Auth"
import { useCartStore } from "@/store/Cart"
import axios from "axios"
import type React from "react"
import { useEffect } from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const { hydrated } = useAuthStore()
  const { hydrated: cartHydrated, setItems, setHydrated } = useCartStore()

  const getItemsFromApi = async () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(CART_COOKIE));

    if (cookie) {
      try {
        const cart = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
        setItems(cart);
      } catch (err) {
        console.error("Invalid cart cookie", err);
      }
    }
  }

  useEffect(() => {
    console.log("hello")
    getItemsFromApi()
    setHydrated()
  }, [])
  
  if (!hydrated || !cartHydrated) {
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
