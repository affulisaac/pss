'use client';

import { RequestPayload } from "./types/state";

export async function makeFetch<T>(
  request: RequestPayload,
  interactionUrl: string
): Promise<T> {
  try {
    const response = await fetch(interactionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data as T;
  } catch (error) {
    console.error('USSD request failed:', error);
    return  error as T;

  }
}