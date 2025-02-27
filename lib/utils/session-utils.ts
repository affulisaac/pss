'use client';

import { RequestPayload } from "../types/state";


export function prepareUSSDPayload(
  formState: RequestPayload,
  userInput: string,
  type: string
): RequestPayload {
  const payload = { 
    ...formState, 
    message: userInput, 
    type 
  };
  
  if (payload.platform === 'HUBTEL-MALL') {
    payload.operator = 'webstore';
  }
  if(payload.platform === 'USSD' && payload.type?.toLowerCase() === 'initiation')  {
    payload.message = payload.ussdCode;
  }
  
  return payload;
}