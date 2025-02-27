import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { useAuth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { getEmailFromToken, isValidHubtelEmail } = useAuth();
  // Get the auth token from the cookies
  const cookieStore = await cookies();

  const authToken = cookieStore.get("auth_token")?.value;
  const email = getEmailFromToken(authToken || "");
  const isEmailValid = isValidHubtelEmail(email);

  // Check if the user is trying to access the login page
  if (request.nextUrl.pathname === "/login") {
    // If user is already authenticated, redirect to home
    if (authToken && isEmailValid) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!authToken || !isEmailValid) {
    const url = request.nextUrl.clone()
    
    // Create the callbackUrl by encoding the current path
    const callbackUrl = encodeURIComponent(url.pathname + url.search)
    
    // Redirect to login page with the callbackUrl
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, request.url)
    )
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/((?!api|_next|public|favicon.ico|.*\\..*).*)',
  ],
};
