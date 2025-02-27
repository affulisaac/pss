"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/card";
import { Button } from "@/components/common/button";
import { ConfigFields } from "./ConfigFields";
import { HeaderFields } from "./HeaderFields";
import { RequestPayload } from "@/lib/types/state";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/common/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/common/input";
import { saveConfig } from "@/lib/utils/config";
import { useAppStore } from "@/hooks/use-app-state";
import { useState } from "react";

interface ConfigCardProps {
  config: RequestPayload;
  onUpdate: (updates: Partial<RequestPayload>) => void;
  onSave: () => void;
}

export function ConfigCard({ config, onUpdate, onSave }: ConfigCardProps) {
  const [isNewConfigOpen, setIsNewConfigOpen] = useState(false);
  const [newConfigName, setNewConfigName] = useState("");
  const { formState, headers } = useAppStore();
  const handleSaveNew = () => {
    if (!newConfigName.trim()) return;

    saveConfig({
      ...(formState as any),
      headers,
      id: "",
      name: newConfigName,
    });

    setNewConfigName("");
    setIsNewConfigOpen(false);
    onSave();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold ">Configuration</h3>
          <Dialog open={isNewConfigOpen} onOpenChange={setIsNewConfigOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Save 
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Configuration</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  placeholder="Configuration name"
                  value={newConfigName}
                  onChange={(e) => setNewConfigName(e.target.value)}
                />
                <Button onClick={handleSaveNew} className="w-full">
                  Save Configuration
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 mt-4">
        <ConfigFields config={config} onUpdate={onUpdate} />
        <HeaderFields />
      </CardContent>
    </Card>
  );
}
