'use client';

import { cn } from '@/lib/utils';

interface USSDLoadingProps {
  theme: 'ios' | 'android';
}

export function USSDLoading({ theme }: USSDLoadingProps) {
  if (theme !== 'android') return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#2C2C2E] rounded-lg p-6 w-[280px] space-y-4">
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
        <p className="text-white text-center text-sm">Please wait...</p>
      </div>
    </div>
  );
}