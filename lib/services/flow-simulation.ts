'use client';

import { Node, Edge } from 'reactflow';
import { NodeData } from '@/lib/types/flow';

export class FlowSimulationService {
  private nodes: Node<NodeData>[];
  private edges: Edge[];
  private currentNode: Node<NodeData> | null = null;
  private initialNode: Node<NodeData> | null = null;

  constructor(nodes: Node<NodeData>[], edges: Edge[]) {
    this.nodes = nodes;
    this.edges = edges;
    // Find and store the initial request node
    this.initialNode = nodes.find(node => node.type === 'request') || null;
    this.currentNode = this.initialNode;
  }

  getNextNode(currentNodeId: string, userInput?: string): Node<NodeData> | null {
    // Find all edges from the current node
    const outgoingEdges = this.edges.filter(edge => edge.source === currentNodeId);
    
    if (!outgoingEdges.length) return null;

    // If we have user input and the current node has menu options
    if (userInput && this.currentNode?.data.config?.data) {
      // Find the menu option that matches the user input
      const selectedIndex = parseInt(userInput) - 1;
      const menuOption = this.currentNode.data.config.data[selectedIndex];

      if (menuOption) {
        // Find the edge that corresponds to this menu option
        const targetEdge = outgoingEdges.find(edge => 
          edge.sourceHandle === `option-${menuOption.value}`
        );
        if (targetEdge) {
          return this.nodes.find(node => node.id === targetEdge.target) || null;
        }
      }
    }
    
    // Default to first edge if no specific path is found
    return this.nodes.find(node => node.id === outgoingEdges[0].target) || null;
  }

  simulateRequest(type: string, userInput?: string) {
    // Reset to initial node when starting a new session
    if (type === 'initiation') {
      if (!this.initialNode) {
        throw new Error('No initial request node found');
      }
      
      // Find the first response node
      const firstResponseEdge = this.edges.find(edge => edge.source === this.initialNode?.id);
      if (!firstResponseEdge) {
        throw new Error('No response node connected to initial request');
      }
      
      const firstResponseNode = this.nodes.find(node => node.id === firstResponseEdge.target);
      if (!firstResponseNode) {
        throw new Error('Response node not found');
      }

      // Reset current node and return first response
      this.currentNode = firstResponseNode;
      return this.formatResponse(firstResponseNode);
    }

    if (!this.currentNode) {
      throw new Error('No current node found');
    }

    // Find the next node based on current node and user input
    const nextNode = this.getNextNode(this.currentNode.id, userInput);
    if (!nextNode) {
      // If no next node, assume it's the end of the flow
      return {
        type: 'Release',
        message: 'End of flow reached',
        sessionId: this.currentNode.data.config?.sessionId || 'session-1',
        data: [],
        dataType: 'display',
        label: 'Flow Complete'
      };
    }

    this.currentNode = nextNode;
    return this.formatResponse(nextNode);
  }

  private formatResponse(node: Node<NodeData>) {
    // Ensure menu options are numbered from 1
    const data = node.data.config?.data?.map((item: any, index: number) => ({
      ...item,
      value: (index + 1).toString()
    })) || [];

    return {
      type: node.data.config?.type || 'Response',
      message: node.data.config?.message || '',
      sessionId: node.data.config?.sessionId || 'session-1',
      data,
      dataType: node.data.config?.dataType || 'display',
      label: node.data.config?.label || node.data.label,
      fieldType: node.data.config?.fieldType || 'text'
    };
  }
}