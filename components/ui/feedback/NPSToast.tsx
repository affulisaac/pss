'use client';

import { useState } from "react";
import { useNPSStore } from "@/hooks/use-nps-store";
import { Button } from "@/components/common/button";
import { Textarea } from "@/components/common/textarea";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface NPSToastProps {
  onClose: () => void;
}

export function NPSToast({ onClose }: NPSToastProps) {
  const [step, setStep] = useState<'score' | 'feedback'>('score');
  const { score, setScore, feedback, setFeedback, submitNPS } = useNPSStore();

  const handleScore = (value: number) => {
    setScore(value);
    setStep('feedback');
  };

  const handleSubmit = async () => {
    await submitNPS();
    onClose();
  };

  return (
    <div className="w-[400px] bg-card rounded-lg shadow-lg border p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold">Help Us Improve</h3>
          <p className="text-sm text-muted-foreground">
            How likely are you to recommend our simulator?
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="-mr-2 -mt-2">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {step === 'score' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-11 gap-1">
            {Array.from({ length: 11 }, (_, i) => (
              <button
                key={i}
                onClick={() => handleScore(i)}
                className={cn(
                  "h-8 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-primary hover:text-primary-foreground",
                  score === i && "bg-primary text-primary-foreground",
                  score !== i && "border border-input bg-background"
                )}
              >
                {i}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Not likely</span>
            <span>Very likely</span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <Textarea
            placeholder="What's the primary reason for your score? (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[80px] text-sm"
          />
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="outline" onClick={() => setStep('score')}>
              Back
            </Button>
            <Button size="sm" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}