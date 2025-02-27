'use client';

import { Flow } from '../types/flow';

export function encodeFlow(flow: Flow): string {
  // Remove unnecessary properties and prepare for encoding
  const minimalFlow = {
    nodes: flow.nodes,
    edges: flow.edges,
    name: flow.name
  };
  
  // Compress and encode the flow data
  const encoded = btoa(JSON.stringify(minimalFlow));
  return encoded;
}

export function decodeFlow(encoded: string): Flow | null {
  try {
    const decoded = JSON.parse(atob(encoded));
    return {
      ...decoded,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
  } catch (error) {
    console.error('Failed to decode flow:', error);
    return null;
  }
}