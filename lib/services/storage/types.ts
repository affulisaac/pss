export interface StorageProvider {
  saveFlow(flow: any, email?: string): Promise<void>;
  loadFlows(email?: string): Promise<any[]>;
  loadFlow?(id: string): Promise<any | null>;
  deleteFlow(id: string, email?: string): Promise<void>;
}

export interface StorageConfig {
  provider: 'local' | 'redis';
  redis?: {
    url: string;
    token: string;
  };
}

export interface FlowWithOwner {
  id: string;
  name: string;
  nodes: any[];
  edges: any[];
  createdAt: Date;
  updatedAt: Date;
  owner?: string;
  isShared?: boolean;
}