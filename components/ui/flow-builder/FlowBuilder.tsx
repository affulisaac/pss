"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useNodesState,
  useEdgesState,
  useReactFlow,
  Node,
  Edge,
  Connection,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { EmptyFlowScreen } from "./EmptyFlowScreen";

import { useToast } from "@/hooks/use-toast";
import { NodeData } from "@/lib/types/flow";
import { NodeConfigPanel } from "./NodeConfigPanel";
import { SimulationDialog } from "./dialogs/SimulationDialog";
import { StorageFactory } from "@/lib/services/storage/storage-factory";
import { exportFlow, importFlow } from "@/lib/services/flow-export";
import { ShareDialog } from "./dialogs/ShareDialog";
import { FlowSidebar } from "@/components/layout/Sidebar";
import { FlowCanvas } from "./FlowCanvas";
import { SaveFlowDialog } from "./dialogs/SaveFlowDialog";
import { DeleteFlowDialog } from "./dialogs/DeleteFlowDialog";
import { StorageProvider } from "@/lib/services/storage/types";

export default function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isSimulateDialogOpen, setIsSimulateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [flowToDelete, setFlowToDelete] = useState<string | null>(null);
  const [flowName, setFlowName] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeFlowId, setActiveFlowId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    type: "node" | "edge" | "board" | null;
    x: number;
    y: number;
    id: string | null;
  }>({
    type: null,
    x: 0,
    y: 0,
    id: null,
  });
  const { toast } = useToast();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();
  const [copiedNodes, setCopiedNodes] = useState<Node<NodeData>[]>([]);
  const [savedFlows, setSavedFlows] = useState<any[]>([]);
  const [storageProvider, setStorageProvider] =
    useState<StorageProvider | null>(null);
  const [undoStack, setUndoStack] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const [isConfigPanelFocused, setIsConfigPanelFocused] = useState(false);
  const route = useRouter();

  useEffect(() => {
    initializeStorage();
  }, []);
  

  useEffect(() => {
    const flowId = searchParams.get("id");
    if (flowId) {
      loadSharedFlow(flowId);
      setActiveFlowId(flowId);
    }
  }, [searchParams]);

  const loadSharedFlow = async (flowId: string) => {
    try {
      const provider = StorageFactory.createProvider({
        provider: process.env.NEXT_PUBLIC_STORAGE_PROVIDER || ("local" as any),
        redis: {
          url: process.env.NEXT_PUBLIC_REDIS_URL || "",
          token: process.env.NEXT_PUBLIC_REDIS_TOKEN || "",
        },
      });

      const sharedFlow = provider.loadFlow
        ? await provider.loadFlow(flowId)
        : (await provider.loadFlows()).find((f) => f.id === flowId);

      if (sharedFlow) {
        setNodes(sharedFlow.nodes);
        setEdges(sharedFlow.edges);
        setFlowName(sharedFlow.name);
        toast({
          title: "Success",
          description: "Flow loaded successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Flow not found",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to load shared flow:", error);
      toast({
        title: "Error",
        description: "Failed to load shared flow",
        variant: "destructive",
      });
    }
  };

  const initializeStorage = async () => {
    try {
      const response = await fetch("/api/flows/config");
      const config = await response.json();
      const provider = StorageFactory.createProvider(config);
      setStorageProvider(provider);
      loadSavedFlows(provider);
    } catch (error) {
      console.error("Failed to initialize storage:", error);
      toast({
        title: "Error",
        description:
          "Failed to initialize storage. Using local storage as fallback.",
        variant: "destructive",
      });
      setStorageProvider(StorageFactory.createProvider({ provider: "local" }));
    }
  };

  const loadSavedFlows = async (provider: any) => {
    try {
      const flows = await provider.loadFlows();
      setSavedFlows(flows);
    } catch (error) {
      console.error("Error loading flows:", error);
      toast({
        title: "Error",
        description: "Failed to load saved flows",
        variant: "destructive",
      });
    }
  };

  const handleNewFlow = () => {
    setNodes([]);
    setEdges([]);
    setFlowName("");
    setActiveFlowId(null);
    setIsSaveDialogOpen(true);
  };

  // Save the current state to undo stack before making changes
  const saveToUndoStack = useCallback(() => {
    setUndoStack((prev) => [...prev, { nodes: [...nodes], edges: [...edges] }]);
    setRedoStack([]);
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      // Check if source node is a release type
      const sourceNode = nodes.find((node) => node.id === params.source);
      if (sourceNode?.data.config?.type?.toLowerCase() === "release") {
        return;
      }

      const existingConnection = edges.find(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle
      );

      if (existingConnection) {
        toast({
          title: "Connection Error",
          description: "A connection already exists from this output",
          variant: "destructive",
        });
        return;
      }

      // Save current state before making changes
      saveToUndoStack();
      
      // Create the new edge
      const newEdges = addEdge(params, edges);
      setEdges(newEdges);
    },
    [edges, nodes, setEdges, toast, saveToUndoStack]
  );

  const handleUndo = useCallback(() => {
    if (undoStack.length > 0) {
      // Get the previous state
      const previousState = undoStack[undoStack.length - 1];
      
      // Save current state to redo stack before undoing
      setRedoStack((prev) => [...prev, { nodes: [...nodes], edges: [...edges] }]);
      
      // Apply the previous state
      setNodes(previousState.nodes);
      setEdges(previousState.edges);
      
      // Remove the used state from undo stack
      setUndoStack((prev) => prev.slice(0, -1));
    }
  }, [undoStack, nodes, edges, setNodes, setEdges]);

  const handleRedo = useCallback(() => {
    if (redoStack.length > 0) {
      // Get the next state
      const nextState = redoStack[redoStack.length - 1];
      
      // Save current state to undo stack before redoing
      setUndoStack((prev) => [...prev, { nodes: [...nodes], edges: [...edges] }]);
      
      // Apply the next state
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      
      // Remove the used state from redo stack
      setRedoStack((prev) => prev.slice(0, -1));
    }
  }, [redoStack, nodes, edges, setNodes, setEdges]);

  const handleAddNode = useCallback(() => {
    const position = { x: 100, y: 100 };
    const hasInitialNode = nodes.some((node) => node.type === "request");
    const shouldAddInitialNode = !hasInitialNode || nodes.length === 0;
    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      position.x = lastNode.position.x + 300;
      position.y = lastNode.position.y;
    }

    // Save current state before making changes
    saveToUndoStack();

    const newNode: Node<NodeData> = {
      id: `node-${Date.now()}`,
      type: shouldAddInitialNode ? "request" : "response",
      position,
      data: {
        label: shouldAddInitialNode ? "Flow Start" : `Response ${nodes.length}`,
        config: {
          type: shouldAddInitialNode ? "Initiation" : "Response",
          platform: "USSD",
          operator: "mtn",
          data: [],
        },
      },
    };

    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
  }, [nodes, setNodes, saveToUndoStack]);

  const handleCopyNodes = useCallback(() => {
    const selectedNodes = nodes.filter((node) => node.selected);
    if (selectedNodes.length > 0) {
      setCopiedNodes(selectedNodes);
      toast({
        title: "Success",
        description: `${selectedNodes.length} node(s) copied to clipboard`,
      });
    }
  }, [nodes, toast]);

  const handlePasteNodes = useCallback(() => {
    if (copiedNodes.length > 0) {
      // Save current state before making changes
      saveToUndoStack();

      const { x, y } = project({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });

      const newNodes = copiedNodes.map((node) => ({
        ...node,
        id: `node-${Date.now()}-${Math.random()}`,
        position: { x: node.position.x + 100, y: node.position.y + 100 },
        data: {
          ...node.data,
          label: `${node.data.label} (Copy)`,
        },
        selected: false,
      }));

      const updatedNodes = [...nodes, ...newNodes];
      setNodes(updatedNodes);

      toast({
        title: "Success",
        description: `${newNodes.length} node(s) pasted successfully`,
      });
    }
  }, [copiedNodes, project, nodes, setNodes, toast, saveToUndoStack]);

  const handleDuplicateNode = useCallback(() => {
    const selectedNodes = nodes.filter((node) => node.selected);
    if (selectedNodes.length === 0) return;

    // Save current state before making changes
    saveToUndoStack();

    const newNodes = selectedNodes.map((node) => ({
      ...node,
      id: `node-${Date.now()}-${Math.random()}`,
      position: {
        x: node.position.x + 100,
        y: node.position.y + 100,
      },
      data: {
        ...node.data,
        label: `${node.data.label} (Copy)`,
      },
      selected: false,
    }));

    const updatedNodes = [...nodes, ...newNodes];
    setNodes(updatedNodes);

    toast({
      title: "Success",
      description: `${newNodes.length} node(s) duplicated successfully`,
    });
  }, [nodes, setNodes, toast, saveToUndoStack]);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent, node?: Node) => {
      event.preventDefault();
      if (node) {
        setContextMenu({
          type: "node",
          x: event.clientX,
          y: event.clientY,
          id: node.id,
        });
      }
    },
    []
  );

  const handleEdgeContextMenu = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.preventDefault();
      setContextMenu({
        type: "edge",
        x: event.clientX,
        y: event.clientY,
        id: edge.id,
      });
    },
    []
  );

  const handlePaneContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({
      type: "board",
      x: event.clientX,
      y: event.clientY,
      id: null,
    });
  }, []);

  const handleDeleteSelected = useCallback(() => {
    console.log(selectedNode?.type)
    if (isConfigPanelFocused || selectedNode?.type === 'request') return;

    // Save current state before making changes
    saveToUndoStack();

    setNodes((nodes) => nodes.filter((node) => !node.selected));
    setEdges((edges) => edges.filter((edge) => !edge.selected));
    setContextMenu({ type: null, x: 0, y: 0, id: null });
  }, [isConfigPanelFocused, saveToUndoStack]);

  const handleSaveFlow = async () => {
    if (!flowName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a flow name",
        variant: "destructive",
      });
      return;
    }

    try {
      const flow = {
        id: activeFlowId || Date.now().toString(),
        name: flowName,
        nodes,
        edges,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await storageProvider?.saveFlow(flow);
      await loadSavedFlows(storageProvider);
      setActiveFlowId(flow.id);

      setIsSaveDialogOpen(false);

      toast({
        title: "Success",
        description: "Flow saved successfully",
      });
    } catch (error: any) {
      console.log(error)
      toast({
        title: "Error",
        description: error?.message || "Failed to save flow",
        variant: "destructive",
      });
    }
  };

  const handleLoadFlow = async (flow: any) => {
    setNodes(flow.nodes);
    setEdges(flow.edges);
    setFlowName(flow.name);
    setActiveFlowId(flow.id);
    route.push(`/flow-builder?id=${flow.id}`);
    toast({
      title: "Success",
      description: "Flow loaded successfully",
    });
    
    // Clear undo/redo stacks when loading a new flow
    setUndoStack([]);
    setRedoStack([]);
  };

  const handleDeleteFlow = (flowId: string) => {
    setFlowToDelete(flowId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteFlow = async () => {
    if (!flowToDelete) return;

    try {
      await storageProvider?.deleteFlow(flowToDelete);
      await loadSavedFlows(storageProvider);

      if (flowToDelete === activeFlowId) {
        setNodes([]);
        setEdges([]);
        setFlowName("");
        setActiveFlowId(null);
        
        // Clear undo/redo stacks when deleting current flow
        setUndoStack([]);
        setRedoStack([]);
      }

      setIsDeleteDialogOpen(false);
      setFlowToDelete(null);

      toast({
        title: "Success",
        description: "Flow deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete flow",
        variant: "destructive",
      });
    }
  };

  const handleExportFlow = () => {
    if (nodes.length === 0) {
      toast({
        title: "Error",
        description: "No flow to export",
        variant: "destructive",
      });
      return;
    }

    const flow = {
      id: Date.now().toString(),
      name: flowName || "Exported Flow",
      nodes,
      edges,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const jsonData = exportFlow(flow);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `flow-${flow.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportFlow = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const jsonData = e.target?.result as string;
        const flow = importFlow(jsonData);
        handleLoadFlow(flow);
        toast({
          title: "Success",
          description: "Flow imported successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const handleSimulate = () => {
    const initialNode = nodes.find((node) => node.type === "request");
    if (!initialNode) {
      toast({
        title: "Error",
        description: "No initial request node found",
        variant: "destructive",
      });
      return;
    }
    setIsSimulateDialogOpen(true);
  };

  const handleDuplicateFlow = async (flow: any, openOnDuplicate?: boolean) => {
    try {
      const duplicatedFlow = {
        ...flow,
        id: Date.now().toString(),
        name: `${flow.name} (Copy)`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await storageProvider?.saveFlow(duplicatedFlow);
      await loadSavedFlows(storageProvider);
      if (openOnDuplicate) {
        handleLoadFlow(duplicatedFlow);
      }

      toast({
        title: "Success",
        description: "Flow duplicated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate flow",
        variant: "destructive",
      });
    }
  };

  const handleRenameFlow = async (id: string, newName: string) => {
    try {
      const flow = savedFlows.find((f) => f.id === id);
      if (!flow) return;

      const updatedFlow = {
        ...flow,
        name: newName,
        updatedAt: new Date(),
      };

      await storageProvider?.saveFlow(updatedFlow);
      await loadSavedFlows(storageProvider);

      if (activeFlowId === id) {
        setFlowName(newName);
      }

      toast({
        title: "Success",
        description: "Flow renamed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to rename flow",
        variant: "destructive",
      });
    }
  };

  const toolbarProps = {
    onAddNode: handleAddNode,
    onCopy: handleCopyNodes,
    onPaste: handlePasteNodes,
    onUndo: handleUndo,
    onRedo: handleRedo,
    onSave: () => setIsSaveDialogOpen(true),
    onSimulate: handleSimulate,
    onExport: handleExportFlow,
    onImport: () => document.getElementById("flow-import")?.click(),
    onShare: () => setIsShareDialogOpen(true),
    canCopy: nodes.some((node) => node.selected),
    canPaste: copiedNodes.length > 0,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
  };

  useEffect(() => {
    // console.log( !isConfigPanelFocused, selectedNode)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isConfigPanelFocused) return;

      if (event.ctrlKey || event.metaKey) {
        if (event.key === "c") {
          event.preventDefault();
          handleCopyNodes();
        } else if (event.key === "v") {
          event.preventDefault();
          handlePasteNodes();
        } else if (event.key === "z") {
          event.preventDefault();
          if (event.shiftKey) {
            handleRedo();
          } else {
            handleUndo();
          }
        } else if (event.key === "s") {
          event.preventDefault();
          if (activeFlowId) {
            handleSaveFlow();
          } else {
            setIsSaveDialogOpen(true);
          }
        }
      } else if (
        (event.key === "Delete" || event.key === "Backspace") &&
       ( !isConfigPanelFocused && selectedNode?.type !== "request")
      ) {
        console.log(!isConfigPanelFocused, selectedNode?.type !== "request")
        handleDeleteSelected();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    handleCopyNodes,
    handlePasteNodes,
    handleDeleteSelected,
    handleUndo,
    handleRedo,
    isConfigPanelFocused,
    activeFlowId,
    handleSaveFlow,
  ]);

  // Fix for NodeConfigPanel updates to also save undo state
  const handleNodeConfigUpdate = useCallback((node: Node<NodeData>, updates: any) => {
    // Save current state before making changes
    saveToUndoStack();
    
    const updatedNodes = nodes.map((n) => {
      if (n.id === node.id) {
        const updatedNode = {
          ...n,
          data: {
            ...n.data,
            ...updates,
            config: {
              ...n.data.config,
              ...(updates.config || {}),
            },
          },
        };
        if (selectedNode?.id === n.id) {
          setSelectedNode(updatedNode);
        }
        return updatedNode;
      }
      return n;
    });
    
    setNodes(updatedNodes);
  }, [nodes, selectedNode, setNodes, saveToUndoStack]);

  return (
<div className="flex">
  {/* Sidebar space reservation - responsive to collapse state */}
  <div className={`${sidebarCollapsed ? 'w-12' : 'w-64'} flex-shrink-0 transition-all duration-300`}></div>
  
  {/* Main content area */}
  <div className="flex-1 flex flex-col h-[calc(100vh-4rem)]">
    {activeFlowId ? (
      <>
        {activeFlowId && (
          <div className="px-4 py-2 border-b bg-muted/40">
            <h2 className="text-lg font-medium">{flowName}</h2>
          </div>
        )}

        <div ref={reactFlowWrapper} className="flex-1">
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            activeFlowId={activeFlowId}
            onNodesChange={onNodesChange}
            onNodeDragStart={()=> {
              saveToUndoStack();
            }}
            onEdgesChange={(changes) => {
              if (changes.some((change: { type: string; }) => change.type === 'remove')) {
                saveToUndoStack();
              }
              onEdgesChange(changes);
            }}
            onConnect={onConnect}
            onNodeSelect={(node) => setSelectedNode(node)}
            contextMenu={contextMenu}
            onContextMenu={{
              node: handleContextMenu,
              edge: handleEdgeContextMenu,
              pane: handlePaneContextMenu,
            }}
            onPaneClick={() => {
              setContextMenu({ type: null, x: 0, y: 0, id: null });
              setSelectedNode(null);
            }}
            toolbarProps={toolbarProps}
            onContextMenuClose={() =>
              setContextMenu({ type: null, x: 0, y: 0, id: null })
            }
            onDeleteSelected={handleDeleteSelected}
            onCopyNodes={handleCopyNodes}
            onDuplicateNode={handleDuplicateNode}
          />
        </div>
      </>
    ) : (
      <EmptyFlowScreen
        onNewFlow={handleNewFlow}
        onImportNewFlow={()=> document.getElementById("flow-import")?.click()}
        onImportTemplate={(template) => {
          const flow = {
            ...template.flow,
            id: Date.now().toString(),
            name: `${
              template.flow.name
            } (${new Date().toLocaleDateString()})`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          handleDuplicateFlow(flow, true);
        }}
      />
    )}
  </div>

  {selectedNode && (
    <div
      className="border-l h-[calc(100vh-4rem)] overflow-y-auto"
      onFocus={() => setIsConfigPanelFocused(true)}
      onBlur={() => setIsConfigPanelFocused(false)}
    >
      <NodeConfigPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onUpdate={(updates) => handleNodeConfigUpdate(selectedNode, updates)}
      />
    </div>
  )}

  {/* Modified FlowSidebar to communicate its collapsed state */}
  <FlowSidebar
    flows={savedFlows}
    activeFlowId={activeFlowId}
    onFlowSelect={handleLoadFlow}
    onNewFlow={handleNewFlow}
    onDeleteFlow={handleDeleteFlow}
    onExportFlow={handleExportFlow}
    onDuplicateFlow={handleDuplicateFlow}
    onRenameFlow={handleRenameFlow}
    isCollapsed={sidebarCollapsed}
    onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
  />

  <SaveFlowDialog
    open={isSaveDialogOpen}
    onOpenChange={setIsSaveDialogOpen}
    flowName={flowName}
    onFlowNameChange={setFlowName}
    onSave={handleSaveFlow}
  />

  <DeleteFlowDialog
    open={isDeleteDialogOpen}
    onOpenChange={setIsDeleteDialogOpen}
    onConfirm={confirmDeleteFlow}
  />

  <SimulationDialog
    open={isSimulateDialogOpen}
    onOpenChange={setIsSimulateDialogOpen}
    initialNode={nodes.find((node) => node.type === "request")}
    nodes={nodes}
    edges={edges}
  />

  <ShareDialog
    open={isShareDialogOpen}
    onOpenChange={setIsShareDialogOpen}
    flow={{
      id: activeFlowId || Date.now().toString(),
      name: flowName || "Shared Flow",
      nodes,
      edges,
      createdAt: new Date(),
      updatedAt: new Date(),
    }}
  />

  <input
    id="flow-import"
    type="file"
    accept=".json"
    onChange={handleImportFlow}
    className="hidden"
  />
</div>
  );
}