'use client';

import { memo, useEffect } from 'react';
import { Handle, Position, NodeProps, NodeResizer, useNodes, useReactFlow } from 'reactflow';
import { NodeData } from '@/lib/types/flow';
import { MoreVertical, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/common/button';

function ResponseNode({ data, selected, id }: NodeProps<NodeData>) {
  const isReleaseType = data.config?.type?.toLowerCase() === 'release';

  const nodes = useNodes();
  const { setNodes } = useReactFlow();
  const selectedNodes = nodes.filter(node => node.selected);
  const isMultipleSelected = selectedNodes.length > 1;

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


  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const customEvent = new CustomEvent('nodeContextMenu', {
      detail: { 
        nodeId: id,
        x: event.clientX,
        y: event.clientY,
        isInitialNode: false
      }
    });
    window.dispatchEvent(customEvent);
  };

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
          border: '0px solid #2563eb'
        }}
        lineStyle={{
          borderWidth: '0px',
          borderColor: '#2563eb'
        }}
      />
      <Handle 
        type="target" 
        position={Position.Left}
        className="w-3 h-3 bg-blue-500"
      />
      
      {/* Only show source handles if not a release type */}
      {!isReleaseType && (
        <>
          {/* Create a handle for each menu option */}
          {data.config?.dataType === 'menu' && data.config.data?.map((item: any, index: number) => (
            <Handle
              key={item.value}
              type="source"
              position={Position.Right}
              id={`option-${item.value}`}
              className="w-3 h-3 bg-blue-500"
              style={{
                top: `${(index + 1) * 25}%`,
              }}
            />
          ))}
          
          {/* Default handle if not a menu or no options */}
          {(!data.config?.dataType || data.config.dataType !== 'menu' || !data.config.data?.length) && (
            <Handle 
              type="source" 
              position={Position.Right}
              className="w-3 h-3 bg-blue-500"
            />
          )}
        </>
      )}
      
      <div className={cn(
        "bg-white px-4 py-2 rounded-lg shadow-lg border-2 min-w-[200px] transition-all duration-200",
        selected 
          ? "border-primary ring-2 ring-primary ring-opacity-50" 
          : "border-blue-200",
        isReleaseType && "border-red-200"
      )}>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-700">{data.label}</div>
            <div className="text-xs text-gray-500 mt-1">
            { `${data.config?.type} (${data.config?.dataType})`}
            </div>
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
        
        {data.config?.data && data.config?.dataType === 'menu' && (
          <div className="mt-2 text-sm text-gray-600 whitespace-pre-line border-t pt-2">
            {data.config.data.map((item: any, index: number) => (
              <div key={index} className="flex justify-between">
                <span>{index + 1}. {item.display}</span>
                <span className="text-xs text-gray-400">→ Option {index+1}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default memo(ResponseNode);

export { ResponseNode }