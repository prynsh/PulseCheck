import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Skip middleware for the root path
  if (req.nextUrl.pathname === '/') {
    return NextResponse.next();
  }
  
  // Your authentication logic here
  const session = await getToken({ req });
  if (!session) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
  
  return NextResponse.next();
}

// Keep your current matcher to handle other routes
export const config = { 
  matcher: ["/((?!api/auth|signin|_next/static|_next/image|favicon.ico|public).*)"],
};