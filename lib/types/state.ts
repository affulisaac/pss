'use client';

import { Header } from './config';
import { SimulatedDevices } from './devices';

export interface RequestPayload {
  id?: string;
  url: string;
  platform: string;
  device: SimulatedDevices;
  operator: string;
  ussdCode: string;
  mobile: string;
  type?: string;
  message: string;
  authToken: string;
  serviceCode: string;
  sessionId: string;
}

export interface AppState {
  isLoading: boolean;
  showDialog: boolean;
  formState: RequestPayload;
  headers: Header[];
  sessionResponse: any;
  userInput: string;
  dialCode: string;
  logs: any[];
}

export interface AppActions {
  setIsLoading: (loading: boolean) => void;
  setShowDialog: (show: boolean) => void;
  updateFormState: (updates: Partial<RequestPayload>) => void;
  setHeaders: (headers: Header[]) => void;
  addHeader: (header: Header) => void;
  removeHeader: (index: number) => void;
  updateHeader: (index: number, header: Header) => void;
  setSessionResponse: (response: any) => void;
  setUserInput: (input: string) => void;
  updateDialCode: (code: string) => void;
  updateRequestLogs: (log: any) => void;
  reset: () => void;
}