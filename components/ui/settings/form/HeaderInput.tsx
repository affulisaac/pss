'use client';

import { X } from "lucide-react";
import { Header } from "@/lib/types/config";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Label } from "@/components/common/label";

interface HeaderInputProps {
  header: Header;
  onChange: (header: Header) => void;
  onRemove: () => void;
}

export function HeaderInput({ header, onChange, onRemove }: HeaderInputProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        <div>
          <Label htmlFor="key" className="text-sm text-muted-foreground">
            Key
          </Label>
          <Input
            id="key"
            placeholder="Header key"
            value={header.key}
            onChange={(e) => onChange({ ...header, key: e.target.value })}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="value" className="text-sm text-muted-foreground">
            Value
          </Label>
          <Input
            id="value"
            placeholder="Header value"
            value={header.value}
            onChange={(e) => onChange({ ...header, value: e.target.value })}
            className="mt-1.5"
          />
        </div>
      </div>
      <div className="pt-7">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-muted-foreground hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}