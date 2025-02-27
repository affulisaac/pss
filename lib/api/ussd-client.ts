'use client';

import { AppError } from '@/lib/types/errors';
import { RequestPayload } from '@/lib/types/state';
import { Header } from '@/lib/types/config';
import { getOrCreateSession } from '../utils/storage';

export async function makeUSSDRequest<T>(
  request: RequestPayload,
  interactionUrl: string,
  headers: Header[] = []
): Promise<T> {
  try {

    if (window.makeUSSDRequest && interactionUrl.startsWith('flow-simulation://')) {
      return window.makeUSSDRequest(request);
    }
    // Convert headers array to object and ensure Content-Type is set
    const headerObj = headers.reduce((acc, { key, value }) => ({
      ...acc,
      [key]: value
    }), {
      'Content-Type': 'application/json'
    });

    const sessionId = getOrCreateSession();
    const response = await fetch(interactionUrl, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'X-ProgServe-Simulator': sessionId as string,
        ...headerObj
        
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw AppError.BadRequest('Invalid request parameters');
        case 401:
          throw AppError.Unauthorized();
        case 404:
          throw AppError.NotFound();
        default:
          throw AppError.ServerError();
      }
    }

    const data = await response.json();
    const parsedResponse = data?.type ? data : data?.data;
    return parsedResponse as T;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (error instanceof Error) {
      throw AppError.ServerError(error.message);
    }

    throw AppError.ServerError('An unexpected error occurred');
  }
}