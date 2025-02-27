'use client'
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { eventPublisher } from "@/utils/event-publisher";

const appId = "7d20f314-7d4e-48f9-9c59-57a2bd49088d";
const BASE_URL = "https://auth.hubtel.com";

declare const AuthSDK: any;

interface AuthResponse {
  data: {
    mobileNumber: string | null;
    token: string;
    expiry: string;
    playerId: string | null;
    requestId: string;
    email: string;
  };
}

export function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSecureToken } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    handleLogin();
  });

  const handleLogin = () => {
    if (typeof AuthSDK === "undefined") return;
    const authSDK = new AuthSDK();
    authSDK.listen(
      async (response: AuthResponse) => {
        try {
          await setSecureToken(response?.data?.token);
          eventPublisher.setUser({
            id: response?.data?.email,
            email: response?.data?.email,
            name: response?.data?.email,
          })
          const redirectUrl = searchParams.get("callbackUrl");
          router.push(decodeURIComponent(redirectUrl || "/"));
          router.refresh()
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Authentication Failed",
            description: "Failed to complete login. Please try again.",
          });
        }
      },
      (error: any) => {
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: error.message || "An error occurred during login",
        });
      }
    );
  };

  return (
    <iframe
      src={`${BASE_URL}/${appId}`}
      title="Hubtel Authentication"
      className="w-full h-screen border-none"
    />
  );
}
