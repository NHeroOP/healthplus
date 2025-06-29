"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  User,
  AlertTriangle,
  Package,
  MessageSquare,
  Settings,
  LogOut,
  Trash2,
  Sun,
  Moon,
  Shield,
  CreditCard,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import { useState } from "react"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Redirect to personal info if on base profile route
    if (pathname === "/profile") {
      router.push("/profile/personal")
    }
  }, [user, router, pathname])

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    console.log("Account deletion requested")
    setShowDeleteDialog(false)
    logout()
    router.push("/")
  }

  if (!user) {
    return null
  }

  const sidebarItems = [
    { id: "personal", label: "Personal Info", icon: User, href: "/profile/personal" },
    { id: "orders", label: "My Orders", icon: Package, href: "/profile/orders" },
    { id: "health", label: "Health Info", icon: AlertTriangle, href: "/profile/health" },
    { id: "reviews", label: "My Reviews", icon: MessageSquare, href: "/profile/reviews" },
    { id: "payment", label: "Payment Methods", icon: CreditCard, href: "/profile/payment" },
    { id: "notifications", label: "Notifications", icon: Bell, href: "/profile/notifications" },
    { id: "security", label: "Security", icon: Shield, href: "/profile/security" },
    { id: "settings", label: "Settings", icon: Settings, href: "/profile/settings" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>

      <div className="px-2 sm:px-4 py-4 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4 sm:mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">My Account</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage your account and preferences</p>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-4">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1 ">
              <div className="sticky top-28 z-50">
                <Card className="border-border bg-card">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-3 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary">
                      <User className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-base sm:text-lg text-card-foreground">
                      {user.firstName} {user.lastName}
                    </CardTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{user.email}</p>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-6">
                    <nav className="space-y-1">
                      {sidebarItems.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={`w-full flex items-center px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium rounded-md transition-colors ${
                            isActive(item.href)
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          <item.icon className="mr-2 sm:mr-3 h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      ))}

                      <Separator className="my-3" />

                      {/* Logout */}
                      <button
                        onClick={logout}
                        className="w-full flex items-center px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <LogOut className="mr-2 sm:mr-3 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">Logout</span>
                      </button>

                    </nav>
                  </CardContent>
                </Card>  
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
