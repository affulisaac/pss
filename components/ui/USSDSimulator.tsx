"use client";

import { useEffect, useState } from "react";
import { ConfigForm } from "./settings/ConfigForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../common/tabs";
import {
  Settings,
  History,
} from "lucide-react";
import { LogViewer } from "./logs/LogViewer";
import { useAppStore } from "@/hooks/use-app-state";
import { useNPSStore } from "@/hooks/use-nps-store";
import { shouldShowNPS } from "@/lib/utils/nps";
import { NPSToast } from "./feedback/NPSToast";
import { eventPublisher } from "@/utils/event-publisher";
import { SimulatorContainer } from "./SimulatorContainer";


export function USSDSimulator() {
  const { formState } = useAppStore();
  const [showNPS, setShowNPS] = useState(false);
  const { lastSubmitted } = useNPSStore();

  useEffect(() => {
    eventPublisher.logAnalyticsEvent({
      actionName: "Intialize USSD Simulator",
      eventType: "Regular",
      additionalProperties: {
        platform: formState.platform,
        operator: formState.operator,
        device: formState.device,
      },
    });
    const timer = setTimeout(() => {
      if (shouldShowNPS(lastSubmitted)) {
        setShowNPS(true);
      }
    }, 2 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [lastSubmitted]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <SimulatorContainer />
          <div>
            <Tabs defaultValue="settings">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="settings"
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="logs" className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Logs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="settings" className="mt-4">
                <ConfigForm />
              </TabsContent>

              <TabsContent value="logs" className="mt-4">
                <LogViewer />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      {showNPS && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
          <NPSToast onClose={() => setShowNPS(false)} />
        </div>
      )}
    </div>
  );
}
