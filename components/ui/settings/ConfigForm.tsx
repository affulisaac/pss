"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/hooks/use-app-state";
import { useUSSDSession } from "@/hooks/use-ussd-session";
import { ConfigCard } from "./sections/ConfigCard";
import { ConfigSelector } from "./ConfigSelector";
import { loadConfigs } from "@/lib/utils/config";
import { SavedConfig } from "@/lib/types/config";
import { CorsNotice } from "@/components/ui/CorsNotice";

export function ConfigForm() {
  const { sendRequest } = useUSSDSession();
  const { setUserInput, updateFormState, setHeaders, formState: config } = useAppStore();
  const [configs, setConfigs] = useState<SavedConfig[]>([]);
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null);

  useEffect(() => {
    loadSavedConfigs();
  }, []);

  const loadSavedConfigs = () => {
    const savedConfigs = loadConfigs();
    setConfigs(savedConfigs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await sendRequest("initiation");
    setUserInput("");
  };

  const handleConfigSelect = (config: SavedConfig) => {
    setSelectedConfigId(config.id);
    updateFormState(config as any);
    setHeaders(config.headers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CorsNotice />
      <ConfigSelector
        configs={configs}
        selectedId={selectedConfigId}
        onSelect={handleConfigSelect}
        onConfigsChange={loadSavedConfigs}
      />
      <ConfigCard
        config={config}
        onUpdate={updateFormState}
        onSave={loadSavedConfigs}
      />
    </form>
  );
}
