"use client";

import { useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  NodeTypes,
  ConnectionMode,
  SelectionMode,
  Connection,
  useReactFlow,
  PanOnScrollMode,
  ReactFlowInstance,
  Panel,
} from "reactflow";
import { NodeData } from "@/lib/types/flow";
import { toPng } from "html-to-image";
import { RequestNode } from "./nodes/RequestNode";
import { ResponseNode } from "./nodes/ResponseNode";
import { NodeContextMenu } from "./NodeContextMenu";
import { EdgeContextMenu } from "./EdgeContextMenu";
import { BoardContextMenu } from "./BoardContextMenu";
import { Toolbar } from "./Toolbar";

const nodeTypes: NodeTypes = {
  request: RequestNode,
  response: ResponseNode,
};

const defaultEdgeOptions = {
  animated: true,
  style: {
    stroke: "#2563eb",
    strokeWidth: 2,
  },
};

interface FlowCanvasProps {
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection | Edge) => void;
  onNodeSelect: (node: Node<NodeData>) => void;
  contextMenu: {
    type: "node" | "edge" | "board" | null;
    x: number;
    y: number;
    id: string | null;
  };
  onContextMenu: {
    node: (event: React.MouseEvent, node: Node) => void;
    edge: (event: React.MouseEvent, edge: Edge) => void;
    pane: (event: React.MouseEvent) => void;
  };
  onPaneClick: () => void;
  toolbarProps: any;
  onContextMenuClose: () => void;
  onDeleteSelected: () => void;
  onCopyNodes: () => void;
  onNodeDragStop?: () => void;
  onNodeDragStart: () => void;
  onDuplicateNode: () => void;
  activeFlowId: string | null;
}

export function FlowCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeSelect,
  contextMenu,
  onContextMenu,
  onPaneClick,
  toolbarProps,
  onContextMenuClose,
  onNodeDragStop,
  onNodeDragStart,
  onDeleteSelected,
  onCopyNodes,
  onDuplicateNode,
  activeFlowId,
}: FlowCanvasProps) {
  const { project, getNodes, fitView } = useReactFlow();
  const flowRef = useRef<HTMLDivElement>(null);
  const instance = useRef<ReactFlowInstance | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleNodeContextMenu = (event: CustomEvent) => {
      const { nodeId, x, y, isInitialNode } = event.detail;
      const node = nodes.find((n) => n.id === nodeId);
      if (node) {
        onContextMenu.node(
          new MouseEvent('contextmenu', { clientX: x, clientY: y }) as unknown as  React.MouseEvent,
          node
        );
      }
    };

    window.addEventListener(
      "nodeContextMenu",
      handleNodeContextMenu as EventListener
    );
    return () => {
      window.removeEventListener(
        "nodeContextMenu",
        handleNodeContextMenu as EventListener
      );
    };
  }, [nodes, onContextMenu]);

  const handleExportImage = useCallback(async () => {
    console.log(
      !flowRef.current,
      !activeFlowId,
      !instance.current,
      !toolbarRef.current
    );
    if (
      !flowRef.current ||
      !activeFlowId ||
      !instance.current ||
      !toolbarRef.current
    )
      return;

    try {
      // Get the current viewport
      const currentViewport = instance.current.getViewport();

      // Calculate flow bounds
      const nodes = getNodes();
      const nodesBounds = nodes.reduce(
        (bounds, node) => {
          const nodeLeft = node.position.x;
          const nodeRight = node.position.x + (node.width || 200);
          const nodeTop = node.position.y;
          const nodeBottom = node.position.y + (node.height || 64);

          return {
            left: Math.min(bounds.left, nodeLeft),
            right: Math.max(bounds.right, nodeRight),
            top: Math.min(bounds.top, nodeTop),
            bottom: Math.max(bounds.bottom, nodeBottom),
          };
        },
        { left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity }
      );

      // Add padding
      const padding = 100;
      const width = nodesBounds.right - nodesBounds.left + padding * 2;
      const height = nodesBounds.bottom - nodesBounds.top + padding * 2;

      // Temporarily adjust the flow container size and hide toolbar
      const flowElement = flowRef.current;
      const originalStyle = flowElement.style.cssText;
      const toolbarElement = toolbarRef.current;
      const originalToolbarDisplay = toolbarElement.style.display;

      // Hide toolbar
      toolbarElement.style.display = "none";

      // Set fixed dimensions to capture full flow
      flowElement.style.width = `${width}px`;
      flowElement.style.height = `${height}px`;

      // Center the flow
      instance.current.setViewport({
        x: -nodesBounds.left + padding,
        y: -nodesBounds.top + padding,
        zoom: 1,
      });

      // Wait for the flow to update
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Generate image
      const dataUrl = await toPng(flowElement, {
        backgroundColor: "#ffffff",
        width: width,
        height: height,
        quality: 1,
        pixelRatio: 2,
        filter: (node) => {
          // Filter out toolbar and controls
          return (
            !node.classList?.contains("react-flow__panel") &&
            !node.classList?.contains("react-flow__controls")
          );
        },
      });

      // Restore original viewport, styles and show toolbar
      flowElement.style.cssText = originalStyle;
      toolbarElement.style.display = originalToolbarDisplay;
      instance.current.setViewport(currentViewport);
      fitView();

      // Download image
      const link = document.createElement("a");
      link.download = `flow-${activeFlowId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error exporting image:", error);
    }
  }, [activeFlowId, getNodes, fitView]);

  // Add exportImage to toolbarProps
  const enhancedToolbarProps = {
    ...toolbarProps,
    onExportImage: handleExportImage,
  };

  return (
    <div ref={flowRef} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => onNodeSelect(node as Node<NodeData>)}
        onNodeContextMenu={onContextMenu.node}
        onEdgeContextMenu={onContextMenu.edge}
        onPaneContextMenu={onContextMenu.pane}
        onPaneClick={onPaneClick}
        onNodeDragStart={onNodeDragStart}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionMode={ConnectionMode.Loose}
        selectionMode={SelectionMode.Partial}
        selectionOnDrag={true}
        panOnDrag={[1, 2]}
        selectionKeyCode={null}
        multiSelectionKeyCode="Shift"
        deleteKeyCode={["Backspace", "Delete"]}
        zoomOnScroll={true}
        panOnScroll={true}
        panOnScrollMode={PanOnScrollMode.Free}
        fitView
        minZoom={0.1}
        maxZoom={4}
        onInit={(reactFlowInstance) => {
          instance.current = reactFlowInstance;
        }}
      >
        <Background />
        <Controls />
        <div ref={toolbarRef}>
          <Panel position="top-left" className="flex gap-2">
            <Toolbar {...enhancedToolbarProps} activeFlowId={activeFlowId} />
          </Panel>
        </div>

        {contextMenu.type === "node" && (
          <NodeContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            nodeId={contextMenu.id!}
            isInitialNode={
              nodes.find((n) => n.id === contextMenu.id)?.type === "request"
            }
            onClose={onContextMenuClose}
            onDelete={onDeleteSelected}
            onCopy={onCopyNodes}
            onDuplicate={onDuplicateNode}
          />
        )}

        {contextMenu.type === "edge" && (
          <EdgeContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            edgeId={contextMenu.id!}
            onClose={onContextMenuClose}
            onDelete={onDeleteSelected}
          />
        )}

        {contextMenu.type === "board" && (
          <BoardContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={onContextMenuClose}
            onAddNode={toolbarProps.onAddNode}
            onPaste={toolbarProps.onPaste}
            onExport={toolbarProps.onExport}
            onImport={toolbarProps.onImport}
            canPaste={toolbarProps.canPaste}
          />
        )}
      </ReactFlow>
    </div>
  );
}
