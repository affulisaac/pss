// import { Platform, Operator } from '../types/flow';

export const PLATFORMS: { label: string; value: string }[] = [
  { label: 'Hubtel Mall', value: 'hubtel-mall' },
  { label: 'USSD', value: 'ussd' },
];

export const OPERATORS: { label: string; value: string }[] = [
  { label: 'Webstore', value: 'Webstore' },
  { label: 'MTN', value: 'mtn' },
  { label: 'Vodafone', value: 'vodafone' },
  { label: 'AirtelTigo', value: 'airteltigo' },
];

export const DATA_TYPES = [
  { label: 'Select', value: 'select' },
  { label: 'Input', value: 'input' },
  { label: 'Display', value: 'display' },
];

export const FIELD_TYPES = [
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Phone', value: 'phone' },
  { label: 'Email', value: 'email' },
];