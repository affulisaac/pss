import { Flow } from '../types/flow';

const FLOW_STORAGE_KEY = 'hubtel-flow-builder';

export const saveFlow = (flow: Flow): void => {
  try {
    const flows = loadFlows();
    const existingIndex = flows.findIndex(f => f.id === flow.id);
    
    if (existingIndex >= 0) {
      flows[existingIndex] = flow;
    } else {
      flows.push(flow);
    }
    
    localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(flows));
  } catch (error) {
  }
};

export const loadFlows = (): Flow[] => {
  try {
    const stored = localStorage.getItem(FLOW_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

export const deleteFlow = (id: string): void => {
  try {
    const flows = loadFlows().filter(f => f.id !== id);
    localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(flows));
  } catch (error) {
    console.error('Error deleting flow:', error);
  }
};

export const formatResponseMessage = (data: Array<{ display: string }> = []): string => {
  return data.map((item, index) => `${index + 1}. ${item.display}`).join('\n');
};

export const calculateNodePosition = (nodes: any[]): { x: number; y: number } => {
  if (!nodes.length) {
    return { x: 100, y: 100 };
  }

  const lastNode = nodes[nodes.length - 1];
  const offset = 300; // Increased spacing between nodes
  
  return {
    x: lastNode.x + offset,
    y: lastNode.y
  };
};