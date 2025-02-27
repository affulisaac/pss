'use client';

import { Copy, Trash2, CopyPlus } from 'lucide-react';
import { Button } from '@/components/common/button';

interface NodeContextMenuProps {
  x: number;
  y: number;
  nodeId: string;
  isInitialNode?: boolean;
  onClose: () => void;
  onDelete: () => void;
  onCopy: () => void;
  onDuplicate: () => void;
}

export function NodeContextMenu({ 
  x, 
  y, 
  nodeId, 
  isInitialNode,
  onClose, 
  onDelete, 
  onCopy, 
  onDuplicate 
}: NodeContextMenuProps) {
  return (
    <div
      className="fixed z-50 min-w-[160px] bg-white rounded-md shadow-lg border p-1"
      style={{
        left: x,
        top: y,
      }}
      onClick={e => e.stopPropagation()}
    >
      {!isInitialNode && (
        <>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sm"
            onClick={() => {
              onCopy();
              onClose();
            }}
          >
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sm"
            onClick={() => {
              onDuplicate();
              onClose();
            }}
          >
            <CopyPlus className="h-4 w-4" />
            Duplicate
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sm text-red-600 hover:text-red-600 hover:bg-red-50"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </>
      )}
      {isInitialNode && (
        <div className="px-4 py-2 text-sm text-gray-500">
          Initial request node cannot be modified
        </div>
      )}
    </div>
  );
}