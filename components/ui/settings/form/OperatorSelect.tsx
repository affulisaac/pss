'use client';

import { OPERATORS } from '@/lib/constants';
import { Label } from '@/components/common/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common/select';

interface OperatorSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function OperatorSelect({ value, onChange }: OperatorSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="operator">Operator</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select operator" />
        </SelectTrigger>
        <SelectContent>
          {OPERATORS.map((op) => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}