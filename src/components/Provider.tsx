"use client";

import React, { useEffect, useState } from 'react'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes'

import { SessionProvider, useSession } from "next-auth/react";
import { useAuthStore } from '@/store/Auth';


export const Provider = ({ children, ...props }: ThemeProviderProps) => {

  return (
    <SessionProvider>
      <ThemeProvider {...props}>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  
  const { status, data } = useSession();
  const { setHydrated, setAuthenticated, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setHydrated();
    setLoading(false);
  }, [])

  useEffect(() => {
    if (status === "authenticated") {
      setAuthenticated(true);
      setUser({
        id: data?.user._id || "",
        username: data?.user.username || "",
        firstName: data?.user.firstName || "",
        lastName: data?.user.lastName || "",
        phone: data?.user.phone || "",
        email: data?.user.email || "",
      });
    }
  }, [status])

  return (
    <NextThemeProvider attribute={"class"} {...props}>
      {loading ? (
        <div className="min-h-screen dark:bg-zinc-900 flex justify-center items-center">
          <div className="text-lg text-gray-500 dark:text-gray-400">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        </div>
      ) : children }
    </NextThemeProvider>
  );
};