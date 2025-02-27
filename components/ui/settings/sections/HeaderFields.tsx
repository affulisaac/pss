'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/common/button';
import { HeaderInput } from '../form/HeaderInput';
import { useAppStore } from '@/hooks/use-app-state';

export function HeaderFields() {
  const { headers, addHeader, removeHeader, updateHeader } = useAppStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Request Headers</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => addHeader({ key: '', value: '' })}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Header
        </Button>
      </div>

      <div className="space-y-4">
        {headers && headers.map((header, index) => (
          <HeaderInput
            key={index}
            header={header}
            onChange={(header) => updateHeader(index, header)}
            onRemove={() => removeHeader(index)}
          />
        ))}
      </div>
    </div>
  );
}