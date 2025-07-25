"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Sun,
  Moon,
  Pill,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/store/Auth";
import axios from "axios";
import { useCartStore } from "@/store/Cart";
import { signOut } from "next-auth/react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, getTotalQuantity } = useCartStore()
  const { user } = useAuthStore()
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const { setAuthenticated, setUser } = useAuthStore();

  const [itemCount, setItemCount] = useState(0);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/store/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
  ];


  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleTheme = () => {
    setTheme(() => theme === 'light' ? 'dark' : 'light')
  }

  const handleLogout = async() => {
    // const { data } = await axios.get("/api/auth/logout")
    try {
      const res = signOut();
      setUser(null);
      setAuthenticated(false);

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setItemCount(getTotalQuantity());
  }, [items])

  return (
    <nav className="bg-background dark:bg-neutral-900 md:bg-background/95 md:dark:bg-neutral-900/95 border-b border-border sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
              <Pill className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              HealthPlus
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {IconComponent && <IconComponent className="h-4 w-4" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Link href="/store/cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative text-muted-foreground hover:text-foreground"
              >
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/profile/personal">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <User className="h-4 w-4 mr-1" />
                    {user.firstName}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Link href="/store/cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative text-muted-foreground hover:text-foreground"
              >
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {IconComponent && <IconComponent className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <div className="border-t border-border pt-4 mt-4">
                {user ? (
                  <div className="space-y-1">
                    <Link
                      href="/store/profile"
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile ({user.firstName})</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted w-full text-left"
                    >
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Link
                      href="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
