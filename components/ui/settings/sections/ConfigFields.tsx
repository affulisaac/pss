'use client';

import { RequestPayload } from '@/lib/types/state';
import { FormField } from '../form/FormField';
import { OperatorSelect } from '../form/OperatorSelect';

interface ConfigFieldsProps {
  config: RequestPayload;
  onUpdate: (updates: Partial<RequestPayload>) => void;
}

export function ConfigFields({ config, onUpdate }: ConfigFieldsProps) {
  return (
    <div className="space-y-6">
      {/* <h3 className="font-medium">Basic Settings</h3> */}
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField
          id="mobile"
          label="Mobile Number"
          value={config.mobile}
          onChange={(value) => onUpdate({ mobile: value })}
          placeholder="233200000000"
        />
        <FormField
          id="ussdCode"
          label="USSD Code"
          value={config.ussdCode}
          onChange={(value) => onUpdate({ ussdCode: value })}
          placeholder="*713#"
        />
        <OperatorSelect
          value={config.operator}
          onChange={(value) => onUpdate({ operator: value })}
        />
        <FormField
          id="sessionId"
          label="Session ID"
          value={config.sessionId}
          onChange={(value) => onUpdate({ sessionId: value })}
          placeholder="Session ID"
        />
        <FormField
          id="serviceCode"
          label="Service Code"
          value={config.serviceCode}
          onChange={(value) => onUpdate({ serviceCode: value })}
          placeholder="Service Code"
        />
        <FormField
          id="url"
          label="Interaction URL"
          value={config.url}
          onChange={(value) => onUpdate({ url: value })}
          placeholder="https://api.example.com/ussd"
        />
      </div>
    </div>
  );
}