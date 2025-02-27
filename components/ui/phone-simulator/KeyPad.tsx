'use client';

import { cn } from '@/lib/utils';
import { useAppStore } from '@/hooks/use-app-state';
import { useUSSDSession } from '@/hooks/use-ussd-session';
import { KeypadButton } from './KeypadButton';
import { DialButton } from './DialButton';
import { isValidUSSDCode } from '@/lib/utils/ussd-utils';

interface KeyPadProps {
  onKeyPress: (key: string) => void;
  theme: 'ios' | 'android';
}

export function KeyPad({ onKeyPress, theme }: KeyPadProps) {
  const { formState, updateFormState } = useAppStore();
  const { sendRequest } = useUSSDSession();

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ];

  const handleKeyPress = (key: string) => {
    updateFormState({ ussdCode: formState.ussdCode + key });
    // onKeyPress(key);
  };

  const handleDial = async () => {
    if (isValidUSSDCode(formState.ussdCode)) {
      await sendRequest('initiation');
    }
  };

  return (
    <div className={cn(
      'px-6 pb-8 pt-2',
      theme === 'ios' 
        ? 'bg-[#F2F2F7] rounded-b-3xl' 
        : 'bg-[#1C1C1E] rounded-b-3xl'
    )}>
      <div className="grid grid-cols-3 gap-y-4 gap-x-6">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="col-span-3 grid grid-cols-3 gap-x-6">
            {row.map((key) => (
              <KeypadButton
                key={key}
                value={key}
                onClick={handleKeyPress}
                theme={theme}
              />
            ))}
          </div>
        ))}
        <div className="col-span-3 flex justify-center mt-2">
          <DialButton 
            onClick={handleDial}
            theme={theme}
            disabled={!isValidUSSDCode(formState.ussdCode)}
          />
        </div>
      </div>
    </div>
  );
}