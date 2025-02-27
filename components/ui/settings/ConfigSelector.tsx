"use client";

import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { Input } from "@/components/common/input";
import { SavedConfig } from "@/lib/types/config";
import { Edit2, MoreVertical, Plus, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/common/dropdown-menu";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/common/dialog";
import { useAppStore } from "@/hooks/use-app-state";
import { saveConfig, deleteConfig } from "@/lib/utils/config";

interface ConfigSelectorProps {
  configs: SavedConfig[];
  selectedId: string | null;
  onSelect: (config: SavedConfig) => void;
  onConfigsChange: () => void;
}

export function ConfigSelector({
  configs,
  selectedId,
  onSelect,
  onConfigsChange,
}: ConfigSelectorProps) {
  const [isNewConfigOpen, setIsNewConfigOpen] = useState(false);
  const [newConfigName, setNewConfigName] = useState("");
  const { formState } = useAppStore();

  const handleSaveNew = () => {
    if (!newConfigName.trim()) return;

    saveConfig({
      ...(formState as any),
      id: "",
      name: newConfigName,
    });

    setNewConfigName("");
    setIsNewConfigOpen(false);
    onConfigsChange();
  };

  const handleDelete = (id: string) => {
    deleteConfig(id);
    onConfigsChange();
  };

  return (
    <>
      {configs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Saved Configurations</h3>
          </div>

          <div className="grid gap-4">
            {configs.map((config) => (
              <Card
                key={config.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedId === config.id ? "border-primary" : ""
                }`}
                onClick={() => onSelect(config)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{config.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {config.platform} • {config.operator}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDelete(config.id)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
