'use client';

export interface Header {
  key: string;
  value: string;
}

export interface ConfigState {
  id: string;
  name: string;
  url: string;
  platform: string;
  device: string;
  operator: string;
  mobile: string;
  ussdCode: string;
  serviceCode: string;
  sessionId: string;
  headers: Header[];
}

export interface SavedConfig extends ConfigState {
  createdAt: string;
  updatedAt: string;
}