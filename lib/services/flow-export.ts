import { Flow } from '../types/flow';

export const exportFlow = (flow: Flow): string => {
  const exportData = {
    version: '1.0',
    flow,
    metadata: {
      exportedAt: new Date().toISOString(),
    }
  };
  
  return JSON.stringify(exportData, null, 2);
};

export const importFlow = (jsonData: string): Flow => {
  try {
    const importData = JSON.parse(jsonData);
    
    // Validate the imported data
    if (!importData.flow || !importData.version) {
      throw new Error('Invalid flow data format');
    }
    
    // Add validation for required flow properties
    const { flow } = importData;
    if (!flow.nodes || !flow.edges) {
      throw new Error('Flow data is missing required properties');
    }
    
    return flow;
  } catch (error) {
    throw new Error('Failed to parse flow data: ' + (error as Error).message);
  }
};