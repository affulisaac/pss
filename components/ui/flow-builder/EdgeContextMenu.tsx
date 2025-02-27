'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/common/button';

interface EdgeContextMenuProps {
  x: number;
  y: number;
  edgeId: string;
  onClose: () => void;
  onDelete: () => void;
}

export function EdgeContextMenu({ x, y, edgeId, onClose, onDelete }: EdgeContextMenuProps) {
  return (
    <div
      className="fixed z-50 min-w-[160px] bg-white rounded-md shadow-lg border p-1"
      style={{
        left: x,
        top: y,
      }}
      onClick={e => e.stopPropagation()}
    >
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 text-sm text-red-600 hover:text-red-600 hover:bg-red-50"
        onClick={() => {
          onDelete();
          onClose();
        }}
      >
        <Trash2 className="h-4 w-4" />
        Delete Connection
      </Button>
    </div>
  );
}