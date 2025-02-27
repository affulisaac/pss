export interface NodeData {
  label: string;
  config: {
    type?: string;
    platform?: string;
    operator?: string;
    mobile?: string;
    ussdCode?: string;
    serviceCode?: string;
    message?: string;
    sessionId?: string;
    fieldType?: string
    label?: string;
    dataType?: 'menu' | 'input' | 'display';
    data?: Array<{
      display: string;
      value: string;
    }>;
  };
}

export interface Flow {
  id: string;
  name: string;
  nodes: any[];
  edges: any[];
  createdAt: Date;
  updatedAt: Date;
  owner?: string;
  isShared?: boolean;
}