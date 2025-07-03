"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ShoppingCart,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Point of Sale", href: "/admin/pos", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(() => theme === 'light' ? 'dark' : 'light')
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-card border-r border-border">
          <div className="flex h-16 items-center justify-between px-4 border-b border-border">
            <h2 className="text-lg font-semibold text-card-foreground">
              HealthPlus Admin
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav>
          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive/80 bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-card border-r border-border">
          <div className="flex items-center h-16 px-4 border-b border-border">
            <h2 className="text-lg font-semibold text-card-foreground">
              HealthPlus Admin
            </h2>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav>
          <div className="p-4 border-t border-border space-y-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="w-full justify-start text-muted-foreground hover:text-card-foreground"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-5 w-5 mr-3" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5 mr-3" />
                  Dark Mode
                </>
              )}
            </Button>

            {/* Logout Button */}
            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive/80 bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="fixed top-4 left-4 z-40"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}
