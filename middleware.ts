import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || '')

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow access to login page and API routes
  if (pathname.startsWith('/admin/login') || pathname.startsWith('/admin/api/')) {
    return NextResponse.next()
  }
  
  // Check if user has auth token
  const token = request.cookies.get('auth-token')?.value
  
  if (!token) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    // Verify the token
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch (error) {
    // Invalid token, redirect to login
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/services/:path*",
    "/admin/monitoring/:path*",
    "/admin/databases/:path*",
  ],
}
