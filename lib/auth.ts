import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  email: string;
  exp: number;
}

export function useAuth() {
  const setSecureToken = async (token: string) => {
    try {
      // Send token to our API to set HTTP-only cookie
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Failed to set authentication token");
      }
    } catch (error) {
      console.error("Error setting auth token:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const isValidHubtelEmail = (email: string): boolean => {
    return email.endsWith("@hubtel.com");
  };

  const getEmailFromToken = (token: string): string => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.email;
    } catch {
      return "";
    }
  }

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  return {
    setSecureToken,
    logout,
    getEmailFromToken,
    isValidHubtelEmail,
    isTokenExpired,
  };
}
