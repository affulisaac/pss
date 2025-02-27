import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  email: string;
  exp: number;
  // Add other token claims you need
}

export async function GET() {
  try {
    const token = (await cookies()).get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ 
        authenticated: false 
      });
    }

    // Decode token to get user info
    const decoded = jwtDecode<DecodedToken>(token);
    
    // Check if token is expired
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      return NextResponse.json({ 
        authenticated: false 
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        email: decoded.email,
        // Add other user info you want to expose
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      authenticated: false 
    });
  }
}