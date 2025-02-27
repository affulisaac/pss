'use client';

import { Button } from "@/components/common/button";
import { Network, Smartphone, Store, LogOut } from "lucide-react";
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { useAppStore } from "@/hooks/use-app-state";
import { useAuth } from "@/lib/auth";

export function PageHeader() {
  const router = useRouter();
  const { logout } = useAuth();
  const { formState, updateFormState } = useAppStore();

  const updateState = (
    platform: string,
    operator: string,
    device: "android" | "ios" | "web"
  ) => {
    updateFormState({ ...formState, operator, platform, device });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8 items-center border-b pb-4">
      <h5 className="text-xl font-bold">Hubtel PS Simulator</h5>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={formState.platform === "USSD" ? "default" : "outline"}
            className={cn(
              "gap-2",
              formState.platform === "USSD" && "text-primary-foreground"
            )}
            onClick={() => updateState("USSD", "mtn", "ios")}
          >
            <Smartphone className="h-4 w-4" />
            USSD
          </Button>
          <Button
            variant={formState.platform === "HUBTEL-MALL" ? "default" : "outline"}
            className={cn(
              "gap-2",
              formState.platform === "HUBTEL-MALL" && "text-primary-foreground"
            )}
            onClick={() => updateState("HUBTEL-MALL", "Webstore", "android")}
          >
            <Store className="h-4 w-4" />
            Hubtel
          </Button>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => router.push('/flow-builder')}
        >
          <Network className="h-4 w-4" />
          Flow Builder
        </Button>
        <Button
          variant="ghost"
          className="gap-2"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}