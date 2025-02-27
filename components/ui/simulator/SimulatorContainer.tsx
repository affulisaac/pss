'use client';

import { PhoneFrame } from "../phone-simulator/PhoneFrame";
import { MallScreen } from "../mall-simulator/MallScreen";
import { LaptopFrame } from "../web-simulator/LaptopFrame";
import { useUSSDSession } from "@/hooks/use-ussd-session";
import { useAppStore } from "@/hooks/use-app-state";

export function SimulatorContainer() {
  const { isLoading } = useUSSDSession();
  const { formState } = useAppStore();

  const renderSimulator = () => {
    if (formState.platform === "USSD") {
      return (
        <PhoneFrame
          theme={formState.device as any}
          isLoading={isLoading}
          operator={formState.operator}
        />
      );
    }

    switch (formState.device) {
      case "android":
      case "ios":
        return (
          <div className="w-[320px] h-[640px] overflow-hidden relative rounded-[44px] border-[14px] border-black bg-white shadow-2xl">
            <MallScreen theme={formState.device} isLoading={isLoading} />
          </div>
        );
      case "web":
        return (
          <div className="w-full py-8">
            <LaptopFrame isLoading={isLoading} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      {renderSimulator()}
    </div>
  );
}