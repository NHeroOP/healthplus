import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getLoggedInUser } from '@/appwrite/server/config'
import { SESSION_COOKIE } from './const'

let isDbInitialized = false
let isStorageInitialized = false

export async function middleware(req: NextRequest) {
  
  const url = req.nextUrl
  const user = await getLoggedInUser()

  if (!user && !["/login", "/register", "/verify", "/", "/about", "/faq"].includes(url.pathname)) {
    return NextResponse.redirect(new URL("/login", url))
  }

  if (user && (["/login", "/register", "/verify"].includes(url.pathname))) {
    return NextResponse.redirect(new URL("/", url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /* Match all request paths except for the ones that start with:
    - api
    - _next/static
    - _next/image
    - favicon.ico
    */
    '/((?!api|_next|.*\\..*).*)',
  ],
  
}