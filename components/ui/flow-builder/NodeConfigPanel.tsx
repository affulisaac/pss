"use client";

import { Network, X } from "lucide-react";
import { Node } from "reactflow";
import { Button } from "@/components/common/button";
import { Label } from "@/components/common/label";
import { Input } from "@/components/common/input";
import { Textarea } from "@/components/common/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select";
import { NodeData } from "@/lib/types/flow";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
const CHARACTER_LIMIT = 140;

interface NodeConfigPanelProps {
  node: Node<NodeData>;
  onClose: () => void;
  onUpdate: (updates: Partial<NodeData>) => void;
}

export function NodeConfigPanel({
  node,
  onClose,
  onUpdate,
}: NodeConfigPanelProps) {
  const [characterCount, setCharacterCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    calculateCharacterCount();
    // Trigger animation after mount
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, [node.data.label, node.data.config?.data]);

  const calculateCharacterCount = () => {
    let count = node.data.label?.length || 0;
    if (node.data.config?.data) {
      count += node.data.config.data.reduce((acc, item) => 
        acc + (item.display?.length || 0), 0
      );
    }
    setCharacterCount(count);
  };

  const updateConfig = (updates: Partial<NodeData["config"]>) => {
    onUpdate({
      config: {
        ...node.data.config,
        ...updates,
      },
    });
  };


  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before closing
    setTimeout(onClose, 300);
  };


  const isOverLimit = characterCount > CHARACTER_LIMIT;
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.stopPropagation();
    }
  };

  return (
    <div 
      className={cn(
        "w-80 border-l bg-white overflow-y-auto fixed right-0 top-0 bottom-0 transform transition-transform duration-300 ease-in-out z-50",
        isVisible ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between">
          <Network className="h-6 w-6 text-primary" />
          <h3 className="font-medium">Node Configuration</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
        <div className="flex justify-between items-center mb-2">
            <Label>Label</Label>
            <span className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-muted-foreground'}`}>
              {characterCount}/{CHARACTER_LIMIT}
            </span>
          </div>
          <Textarea
            value={node.data.label}
            rows={3}
            onKeyDown={handleKeyDown}
            onChange={(e) => onUpdate({ label: e.target.value })}
          />
           {isOverLimit && (
            <p className="text-sm text-red-500 mt-1">
              Character limit exceeded
            </p>
          )}
        </div>

        {node.type === "request" ? (
          <>
            <div>
              <Label>Platform</Label>
              <Select
                value={node.data.config?.platform || "USSD"}
                onValueChange={(value) => updateConfig({ platform: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USSD">USSD</SelectItem>
                  <SelectItem value="HUBTEL-MALL">Hubtel Mall</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>USSD Code</Label>
              <Input
              onKeyDown={handleKeyDown}
                value={node.data.config?.ussdCode || ""}
                onChange={(e) => updateConfig({ ussdCode: e.target.value })}
                placeholder="*xxx#"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <Label>Response Type</Label>
              <Select
                value={node.data.config?.type || "Response"}
                onValueChange={(value) => updateConfig({ type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Response">Response</SelectItem>
                  <SelectItem value="Release">Release</SelectItem>
                  {/* <SelectItem value="AddToCart">Add to Cart</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Data Type</Label>
              <Select
                value={node.data.config?.dataType}
                onValueChange={(value) => updateConfig({ dataType: value as any })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  {node.data.config?.type === "Response" && (
                    <>
                      <SelectItem value="menu">Menu</SelectItem>
                      <SelectItem value="input">Input</SelectItem>
                    </>
                  )}
                  {node.data.config?.type === "Release" && (
                    <SelectItem value="display">Display</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {node.data.config?.dataType === "menu" && (
              <div>
                <Label>Menu Items</Label>
                <div className="space-y-2 mt-2">
                  {(node.data.config?.data || []).map(
                    (item: any, index: number) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={item.display}
                          onChange={(e) => {
                            const newData = [...(node.data.config?.data || [])];
                            newData[index] = {
                              ...item,
                              display: e.target.value,
                            };
                            updateConfig({ data: newData });
                          }}
                          placeholder="Display text"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newData = node.data.config?.data?.filter(
                              (_, i) => i !== index
                            );
                            updateConfig({ data: newData });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  )}
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newData = [
                        ...(node.data.config?.data || []),
                        {
                          display: "",
                          value: String(node.data.config?.data?.length || 0),
                        },
                      ];
                      updateConfig({ data: newData });
                    }}
                  >
                    Add Menu Item
                  </Button>
                </div>
              </div>
            )}

            {/* {["display", "input"].includes(node.data?.config?.dataType) && (
              <div>
                <Label>Message</Label>
                <Textarea
                  value={node.data.config?.message || ""}
                  onChange={(e) => updateConfig({ message: e.target.value })}
                  rows={4}
                />
              </div>
            )} */}
          </>
        )}
      </div>
    </div>
  );
}


