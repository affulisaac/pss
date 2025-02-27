import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    provider: process.env.STORAGE_PROVIDER || 'local',
    redis: process.env.REDIS_URL ? {
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN
    } : undefined
  });
}