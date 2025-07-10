import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt";
 
export async function middleware(req: NextRequest ) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const isLoggedIn = !!token
  const url = req.nextUrl

  if (!isLoggedIn && (!["/login", "/signup", "/", "/about", "/faq"].includes(url.pathname) || !url.pathname.startsWith("/verify"))) {
    return NextResponse.redirect(new URL("/login", url))
  }

  if (isLoggedIn && ((["/login", "/signup"].includes(url.pathname)) || url.pathname.startsWith("/verify"))) {
    return NextResponse.redirect(new URL("/", url))
  }
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