import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt";
 
export async function middleware(req: NextRequest ) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const isLoggedIn = !!token
  const url = req.nextUrl

  const isPublicRoute =
    ["/login", "/signup", "/", "/about", "/faq"].includes(url.pathname) ||
    url.pathname.startsWith("/verify");

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", url))
  }

  const isAuthOnlyPage =
    ["/login", "/signup"].includes(url.pathname) ||
    url.pathname.startsWith("/verify");
  
  if (isLoggedIn && isAuthOnlyPage) {
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