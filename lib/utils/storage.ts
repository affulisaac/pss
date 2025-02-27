'use client';

const STORAGE_PREFIX = 'hubtel-ps-';

export const StorageKeys = {
  CORS_NOTICE_DISMISSED: `${STORAGE_PREFIX}cors-notice-dismissed`,
} as const;

export const getStorageItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
};

export const setStorageItem = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, value);
};

// Store in localStorage
const createSession = () => {
  const sessionId =Date.now().toString(36) + Math.random().toString(36).substring(2);
  localStorage.setItem('sessionId', sessionId);
  return sessionId;
};

// Check if session exists
export const getOrCreateSession = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = createSession();
  }
  return sessionId;
};