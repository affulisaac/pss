"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getStorageItem, setStorageItem } from "@/lib/utils/storage";
import { eventPublisher } from "@/utils/event-publisher";
interface NPSState {
  score: number | null;
  feedback: string;
  lastSubmitted: string | null;
  setScore: (score: number) => void;
  setFeedback: (feedback: string) => void;
  submitNPS: () => Promise<void>;
}

export const useNPSStore = create<NPSState>()(
  devtools(
    (set, get) => ({
      score: null,
      feedback: "",
      lastSubmitted: getStorageItem("nps_last_submitted"),

      setScore: (score) => set({ score }),

      setFeedback: (feedback) => set({ feedback }),

      submitNPS: async () => {
        const { score, feedback } = get();

        eventPublisher.logAnalyticsEvent({
          actionName: "Submit Feedback",
          eventType: "Regular",
          additionalProperties: {
            score,
            feedback,
          },
        });

        // Store submission timestamp
        const timestamp = new Date().toISOString();
        setStorageItem("nps_last_submitted", timestamp);

        set({
          score: null,
          feedback: "",
          lastSubmitted: timestamp,
        });
      },
    }),
    { name: "nps-store" }
  )
);
