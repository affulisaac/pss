import { StorageProvider } from "./types";
import { Flow } from "@/lib/types/flow";
import { FlowWithOwner } from "./types";
import { useToast } from "@/hooks/use-toast";

const FLOW_STORAGE_KEY = "hubtel-flow-builder";

export class LocalStorageProvider implements StorageProvider {
  async saveFlow(flow: Flow, email?: string): Promise<void> {
    const {toast} = useToast();
    try {
      const flows = await this.loadFlows();
      const flowWithOwner: FlowWithOwner = {
        ...flow,
        owner: email,
        isShared: !email, // If no email, it's a shared flow
      };
       

      const existingIndex = flows.findIndex((f) => f.id === flow.id);
      // const flowNameExists = flows.some((f) => f.name === flow.name && f.id !== flow.id);
      if (existingIndex >= 0) {
        flows[existingIndex] = flowWithOwner;
      } else {
        flows.push(flowWithOwner);
      }

      localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(flows));
    } catch (error) {
      throw error;
    }
  }

  async loadFlows(email?: string): Promise<Flow[]> {
    try {
      const stored = localStorage.getItem(FLOW_STORAGE_KEY);
      const flows: FlowWithOwner[] = stored ? JSON.parse(stored) : [];
      //sort flows by date  
      flows.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      return flows;
    } catch (error) {
      console.error("Error loading flows:", error);
      return [];
    }
  }

  async loadFlow(id: string): Promise<Flow | null> {
    try {
      const stored = localStorage.getItem(FLOW_STORAGE_KEY);
      const flows: FlowWithOwner[] = stored ? JSON.parse(stored) : [];
      const flow = flows.find((f) => f.id === id);
      return flow || null;
    } catch (error) {
      console.error("Error loading flow:", error);
      return null;
    }
  }

  async deleteFlow(id: string, email?: string): Promise<void> {
    try {
      const flows = await this.loadFlows();
      const flow = flows.find((f) => f.id === id);

      // Only allow deletion if user owns the flow or it's a shared flow
      // if (!flow || (flow.owner && flow.owner !== email)) {
      //   throw new Error("Unauthorized to delete this flow");
      // }

      const updatedFlows = flows.filter((f) => f.id !== id);
      localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(updatedFlows));
    } catch (error) {
      console.error("Error deleting flow:", error);
      throw error;
    }
  }
}
