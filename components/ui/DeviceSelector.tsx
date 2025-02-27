'use client';

import { Button } from "@/components/common/button";
import { Laptop, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/hooks/use-app-state";
import { SimulatedDevices } from "@/lib/types/devices";

interface DeviceSelectorProps {
  platform: string;
}

export function DeviceSelector({ platform }: DeviceSelectorProps) {
  const { formState, updateFormState } = useAppStore();

  const updateDevice = (device: SimulatedDevices) => {
    updateFormState({ 
      ...formState, 
      device,
      operator: device === 'web' ? 'Webstore' : formState.operator 
    });
  };

  if (platform === 'USSD') {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant={formState.device === "android" ? "default" : "outline"}
          className={cn(
            "gap-2",
            formState.device === "android" && "text-primary-foreground"
          )}
          onClick={() => updateDevice("android")}
        >
          <Smartphone className="h-4 w-4" />
          Android
        </Button>
        <Button
          variant={formState.device === "ios" ? "default" : "outline"}
          className={cn(
            "gap-2",
            formState.device === "ios" && "text-primary-foreground"
          )}
          onClick={() => updateDevice("ios")}
        >
          <Smartphone className="h-4 w-4" />
          iOS
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={formState.device === "android" ? "default" : "outline"}
        className={cn(
          "gap-2",
          formState.device === "android" && "text-primary-foreground"
        )}
        onClick={() => updateDevice("android")}
      >
        <Smartphone className="h-4 w-4" />
        Android
      </Button>
      <Button
        variant={formState.device === "ios" ? "default" : "outline"}
        className={cn(
          "gap-2",
          formState.device === "ios" && "text-primary-foreground"
        )}
        onClick={() => updateDevice("ios")}
      >
        <Smartphone className="h-4 w-4" />
        iOS
      </Button>
      <Button
        variant={formState.device === "web" ? "default" : "outline"}
        className={cn(
          "gap-2",
          formState.device === "web" && "text-primary-foreground"
        )}
        onClick={() => updateDevice("web")}
      >
        <Laptop className="h-4 w-4" />
        Web
      </Button>
    </div>
  );
}