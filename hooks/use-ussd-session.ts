"use client";

import { useState } from "react";
import { makeUSSDRequest } from "@/lib/api/ussd-client";
import { prepareUSSDPayload } from "@/lib/utils/session-utils";
import { useAppStore } from "./use-app-state";
import { useToast } from "./use-toast";
import { AppError } from "@/lib/types/errors";
import { eventPublisher } from "@/utils/event-publisher";

export function useUSSDSession() {
  // const { logAnalyticsEvent } = eventPublisher;
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const {
    formState,
    updateRequestLogs,
    userInput,
    setSessionResponse,
    setShowDialog,
    headers,
  } = useAppStore();

  const sendRequest = async (type: string, message?: string) => {
    setIsLoading(true);

    try {
      const payload = prepareUSSDPayload(
        formState,
        message ? message : userInput,
        type
      );

      const response = await makeUSSDRequest<Record<string, any>>(
        payload,
        formState.url,
        headers
      );

      setShowDialog(true);
      setSessionResponse(response);
      updateRequestLogs({
        request: payload,
        response,
        timestamp: new Date(),
      });
      // logAnalyticsEvent({
      //   actionName: "Service Response",
      //   eventType: "Regular",
      //   additionalProperties: {
      //     response: response,
      //   },
      // });
      return response;
    } catch (error) {
      let message = "An unexpected error occurred";

      if (error instanceof AppError) {
        message = error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: message,
      });

      return {
        type: "release",
        message: "Service temporarily unavailable. Please try again later.",
        sessionId: formState.sessionId,
        status: "error",
        data: [],
        dataType: "display",
        fieldName: "",
        fieldType: "",
        label: "Error",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    sendRequest,
  };
}
