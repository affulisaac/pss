export interface USSDConfig {
  mobile: string;
  ussdCode: string;
  operator: string;
  interactionUrl: string;
  sequence?: number;
  clientState: string;
  platform: string;
  serviceCode: string;
  sessionId: string;
}

export interface USSDRequest {
  type: ResponseType;
  mobile: string;
  message: string;
  serviceCode: string;
  operator: string;
  clientState: string;
  sessionId: string;
  sequence?: number;
  platform: string;
}

export interface USSDResponse {
  sessionId: string;
  type: "response" | "release" | "AddToCart";
  message: string;
  label: string;
  data: Record<string, any>[];
  clientState?: string;
  dataType: "display" | "input";
  fieldType: "text" | "phone" | "email" | "number" | "decimal" | "textarea";
  inputPrompt?: string;
  validationRegex?: string;
}

export type PhoneTheme = "ios" | "android";
export type Platform = "USSD" | "HUBTEL-MALL" | "WEB";

export interface NomineeData {
  display: string;
  value: string;
  amount: number;
}

export type ResponseType = "initiation" | "response" | "release" | "addToCart";

export type BuilderNode = {
  id?: string;
  title: string;
  width: number;
  height: number;
  x: number;
  y: number;
  type: string
  config: Record<string, any>;
};

export type ConnectionPosition = 'top' | 'right' | 'bottom' | 'left';

export interface Connection {
  id: string;
  from: string;
  to: string;
  fromPos: ConnectionPosition;
  toPos: ConnectionPosition;
}


export type NodeConfig = any

export interface Flow {
  id: string;
  name: string;
  nodes: Node[];
  connections: Connection[];
  createdAt: Date;
  updatedAt: Date;
}

// Flow Validation Error
export interface FlowValidationError {
  nodeId?: string;
  connectionId?: string;
  message: string;
  type: 'error' | 'warning';
}

// Flow Export Format
export interface FlowExport {
  version: string;
  flow: Flow;
  metadata: {
    exportedAt: Date;
    version: string;
  };
}

// Node Editor Props
export interface NodeEditorProps {
  node: Node;
  onUpdate: (updatedNode: Node) => void;
}

// Flow Builder Props
export interface FlowBuilderProps {
  initialFlow?: Flow;
  onChange?: (flow: Flow) => void;
  onSave?: (flow: Flow) => void;
  readOnly?: boolean;
  validationErrors?: FlowValidationError[];
}

// Flow Simulation State
export interface SimulationState {
  currentNodeId: string;
  inputHistory: Array<{
    nodeId: string;
    input: string;
    timestamp: Date;
  }>;
  sessionData: Record<string, any>;
}

// Flow Builder Context
export interface FlowBuilderContext {
  selectedNode: Node | null;
  setSelectedNode: (node: Node | null) => void;
  selectedConnection: Connection | null;
  setSelectedConnection: (connection: Connection | null) => void;
  isSimulating: boolean;
  simulationState?: SimulationState;
  zoom: number;
  setZoom: (zoom: number) => void;
  validationErrors: FlowValidationError[];
}
