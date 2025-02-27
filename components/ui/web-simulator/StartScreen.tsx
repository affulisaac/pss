'use client';

import { Button } from "@/components/common/button";
import { useUSSDSession } from "@/hooks/use-ussd-session";
import { Play } from "lucide-react";

export function StartScreen() {
  const { sendRequest } = useUSSDSession();

  const handleStart = async () => {
    await sendRequest('initiation');
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">his simulator provide a similar experience like how your programable service will behave on the Hubtel. Configure it and click on the start button to begin</h2>
        <p className="text-gray-500">Click the button below to start your web experience</p>
        <Button 
          onClick={handleStart}
          size="lg"
          className="gap-2"
        >
          <Play className="h-4 w-4" />
          Start Session
        </Button>
      </div>
    </div>
  );
}