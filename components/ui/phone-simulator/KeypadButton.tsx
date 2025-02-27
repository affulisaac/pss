'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/common/button';
import { getKeypadLetters } from '@/lib/utils/ussd-utils';

interface KeypadButtonProps {
  value: string;
  onClick: (value: string) => void;
  theme: 'ios' | 'android';
}

export function KeypadButton({ value, onClick, theme }: KeypadButtonProps) {
  const letters = getKeypadLetters(value);

  return (
    <Button
      onClick={() => onClick(value)}
      className={cn(
        'h-[52px] relative p-0 border-0',
        theme === 'ios' 
          ? 'bg-white hover:bg-white/90 rounded-full text-black shadow-sm' 
          : 'bg-transparent hover:bg-white/10 rounded-full text-white',
      )}
    >
      <div className="flex flex-col items-center">
        <span className={cn(
          'text-xl leading-none mb-0.5',
          theme === 'ios' ? 'font-normal' : 'font-light'
        )}>
          {value}
        </span>
        {letters && (
          <span className={cn(
            'text-[9px] tracking-[0.12em] uppercase',
            theme === 'ios' 
              ? 'text-black/60 font-medium' 
              : 'text-white/60'
          )}>
            {letters}
          </span>
        )}
      </div>
    </Button>
  );
}