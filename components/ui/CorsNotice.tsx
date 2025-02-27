'use client';

import { useState } from 'react';
import { AlertCircle, X, ExternalLink } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/common/alert";
import { Button } from "@/components/common/button";
import { CorsInstructionsDialog } from '@/components/ui/CorsInstructionDialog';

export function CorsNotice() {
  const [isVisible, setIsVisible] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <Alert className="mb-6 pr-12 relative" variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important: CORS Configuration</AlertTitle>
        <AlertDescription className="mt-2 text-sm space-y-2">
          <p>
            For local development, we recommend using a CORS browser extension or ngrok to bypass CORS restrictions.
          </p>
          <Button 
            variant="link" 
            type='button'
            className="h-auto p-0 text-sm font-medium"
            onClick={() => setShowInstructions(true)}
          >
            Learn more <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </AlertDescription>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 opacity-70 hover:opacity-100"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </Alert>

      <CorsInstructionsDialog 
        open={showInstructions} 
        onOpenChange={setShowInstructions} 
      />
    </>
  );
}