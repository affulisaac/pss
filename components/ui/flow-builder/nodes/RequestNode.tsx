'use client';

import { memo, useEffect } from 'react';
import { Handle, Position, NodeProps, NodeResizer, useNodes, useReactFlow } from 'reactflow';
import { NodeData } from '@/lib/types/flow';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/common/button';

function RequestNode({ data, selected, id }: NodeProps<NodeData>) {
  const nodes = useNodes();
  const { setNodes } = useReactFlow();
  const selectedNodes = nodes.filter(node => node.selected);
  const isMultipleSelected = selectedNodes.length > 1;

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // Dispatch a custom event that will be handled by the parent component
    const customEvent = new CustomEvent('nodeContextMenu', {
      detail: { 
        nodeId: id,
        x: event.clientX,
        y: event.clientY,
        isInitialNode: true
      }
    });
    window.dispatchEvent(customEvent);
  };

  useEffect(() => {
    const handleNodeResize = (event: CustomEvent) => {
      const { nodeId, width, height } = event.detail;
      if (nodeId !== id) {
        setNodes(nodes => 
          nodes.map(node => {
            if (node.selected && node.id !== id) {
              return {
                ...node,
                style: { ...node.style, width, height }
              };
            }
            return node;
          })
        );
      }
    };

    window.addEventListener('node-resize' as any, handleNodeResize);
    return () => window.removeEventListener('node-resize' as any, handleNodeResize);
  }, [id, setNodes]);

  return (
    <>
     <NodeResizer
        isVisible={selected}
        minWidth={200}
        minHeight={80}
        handleStyle={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'white',
          border: '2px solid #2563eb'
        }}
        lineStyle={{
          borderWidth: '2px',
          borderColor: '#2563eb'
        }}
      />
      <Handle 
        type="source" 
        position={Position.Right}
        className="w-3 h-3 bg-blue-500"
      />
      
      <div className={cn(
        "bg-white px-4 py-2 rounded-lg shadow-lg border-2 min-w-[200px] transition-all duration-200",
        selected 
          ? "border-primary ring-2 ring-primary ring-opacity-50" 
          : "border-blue-200",
      )}>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-700 whitespace-pre-line">{data.label}</div>
            <div className="text-xs text-gray-500 mt-1">Start</div>
          </div>
          <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={handleContextMenu}
            >
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </Button>
        </div>
      </div>
    </>
  );
}

export default memo(RequestNode);

export { RequestNode }