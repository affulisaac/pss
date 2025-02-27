"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AppState, AppActions } from "@/lib/types/state";

const initialState: AppState = {
  isLoading: false,
  showDialog: false,
  formState: {
    url: "http://localhost:2000/api/requests/interaction",
    platform: "USSD",
    device: "android",
    operator: "mtn",
    mobile: "233547469379",
    ussdCode: "*713#",
    message: "",
    authToken: "hsdeofgfg",
    serviceCode: "70972a31e8e443c69ed189160590d7cf",
    sessionId: "ssdsdsd",
  },
  headers: [],
  sessionResponse: {},
  userInput: "",
  dialCode: "",
  logs: [],
};

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    (set) => ({
      ...initialState,

      setIsLoading: (loading) =>
        set({ isLoading: loading }, false, "setIsLoading"),

      setShowDialog: (show) =>
        set({ showDialog: show }, false, "setShowDialog"),

      updateFormState: (updates) =>
        set(
          (state) => ({
            formState: { ...state.formState, ...updates },
          }),
          false,
          "updateFormState"
        ),

      setHeaders: (headers) => set({ headers }, false, "setHeaders"),

      addHeader: (header) =>
        set(
          (state) => ({ headers: [...state.headers || [], header] }),
          false,
          "addHeader"
        ),

      removeHeader: (index) =>
        set(
          (state) => ({
            headers: state.headers.filter((_, i) => i !== index),
          }),
          false,
          "removeHeader"
        ),

      updateHeader: (index, header) =>
        set(
          (state) => ({
            headers: state.headers.map((h, i) => (i === index ? header : h)),
          }),
          false,
          "updateHeader"
        ),

      setSessionResponse: (response) =>
        set({ sessionResponse: response }, false, "setSessionResponse"),

      setUserInput: (input) => set({ userInput: input }, false, "setUserInput"),

      updateDialCode: (code) =>
        set(
          (state) => ({ dialCode: state.dialCode + code }),
          false,
          "updateDialCode"
        ),

      updateRequestLogs: (log) =>
        set((state) => ({ logs: [...state.logs, log] }), false, "addLog"),

      reset: () => set(initialState, false, "reset"),
    }),
    { name: "app-store" }
  )
);
