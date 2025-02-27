"use client";

import { eventPublisher } from "@/utils/event-publisher";
import { useEffect, useState } from "react";

interface AuthStatus {
  authenticated: boolean;
  user?: {
    email: string;
  };
}

export function useClientSession() {
  const [status, setStatus] = useState<AuthStatus | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      setStatus(data);
      setIsAuthenticated(data.authenticated);
     
      if (data.authenticated && data.user) {
        eventPublisher.setUser({
          id: data.user.email,
          email: data.user.email,
          name: data.user.email,
        });
      }
    } catch (error) {
      console.error("Failed to check auth status:", error);
    } finally {
    }
  };

  return {
    isAuthenticated: isAuthenticated ?? false,
    user: status?.user,
  };
}
