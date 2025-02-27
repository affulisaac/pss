'use client';

import { Button } from "@/components/common/button";
import { cn } from "@/lib/utils";
import { PhoneIcon } from "lucide-react";

interface DialButtonProps {
  onClick: () => void;
  theme: 'ios' | 'android';
  disabled?: boolean;
}

export function DialButton({ onClick, theme, disabled }: DialButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'h-[72px] w-[72px] relative p-0 border-0',
        theme === 'ios' 
          ? ' hover:bg-green-600 rounded-full' 
          : ' hover:bg-green-600 rounded-full',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <PhoneIcon className="h-8 w-8 text-white" />
    </Button>
  );
}