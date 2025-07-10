import AdminSidebar from "@/components/AdminSidebar"
import type React from "react"


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      {children}
    </div>
  )
}
