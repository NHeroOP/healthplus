import React from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes'

export function ThemeProvider({children, ...props}: ThemeProviderProps) {
  return (
    <NextThemeProvider attribute={"class"} {...props}>
      {children}
    </NextThemeProvider>
  )
}