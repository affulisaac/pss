"use client";

import { Dialog, DialogContent } from "@/components/common/dialog";
import { Node, Edge } from "reactflow";
import { NodeData } from "@/lib/types/flow";
import { useAppStore } from "@/hooks/use-app-state";
import { useEffect, useRef } from "react";
import { SimulatorContainer } from "../../SimulatorContainer";
import { FlowSimulationService } from "@/lib/services/flow-simulation";
import { Smartphone, Store } from "lucide-react";
import { Button } from "@/components/common/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/common/scroll-area";

interface SimulationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialNode: Node<NodeData> | undefined;
  nodes: Node<NodeData>[];
  edges: Edge[];
}

export function SimulationDialog({
  open,
  onOpenChange,
  initialNode,
  nodes,
  edges,
}: SimulationDialogProps) {
  const { updateFormState, formState, reset } = useAppStore();
  const simulationService = useRef<FlowSimulationService | null>(null);

  const platforms = [
    { name: "USSD", value: "USSD", icon: Smartphone },
    { name: "Hubtel Mall", value: "HUBTEL-MALL", icon: Store },
  ];

  useEffect(() => {
    initialize();
  }, [open, initialNode, nodes, edges, updateFormState, reset]);


  const initialize = () => {
    if (open && initialNode) {
      reset();
      simulationService.current = new FlowSimulationService(nodes, edges);
      const mockUrl = "flow-simulation://local";
      updateFormState({
        url: mockUrl,
        platform: initialNode.data.config?.platform || "USSD",
        operator: "mtn",
        mobile: "233547469379",
        ussdCode: initialNode.data.config?.ussdCode || "*713#",
        message: initialNode.data.config?.message || "",
        serviceCode: "70972a31e8e443c69ed189160590d7cf",
        sessionId: "session-1",
        device: "ios",
        authToken: "token",
      });
      window.makeUSSDRequest = async (request: any) => {
        console.log("Making USSD request:", request);
        if (!simulationService.current) {
          throw new Error("Simulation service not initialized");
        }
        return simulationService.current.simulateRequest(
          request.type,
          request.message
        );
      };
    }

    return () => {
      delete window.makeUSSDRequest;
    };
  }

  //set palatform
  const handlePlatformChange = (platform: string) => {
    initialize();
    updateFormState({
      platform,
      operator: platform === "HUBTEL-MALL" ? "Webstore" : "mtn",
      device: platform === "HUBTEL-MALL" ? "web" : "ios",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <div className="">
          <div className="flex justify-center w-full items-center gap-2  p-1 rounded-lg mb-2">
            {platforms.map((platform) => (
              <Button
                key={platform.value}
                variant={
                  formState.platform === platform.value ? "default" : "ghost"
                }
                size="sm"
                onClick={() => handlePlatformChange(platform.value)}
                className={cn(
                  "gap-2",
                  formState.platform === platform.value &&
                    "text-primary-foreground"
                )}
              >
                <platform.icon className="h-4 w-4" />
                {platform.name}
              </Button>
            ))}
          </div>
          <ScrollArea className="h-[calc(100vh-250px)]">
            <SimulatorContainer />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
