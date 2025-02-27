'use client';

import { Copy, Clipboard, PlusCircle, Download, Upload } from 'lucide-react';
import { Button } from '@/components/common/button';

interface BoardContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAddNode: () => void;
  onPaste: () => void;
  onExport: () => void;
  onImport: () => void;
  canPaste: boolean;
}

export function BoardContextMenu({ 
  x, 
  y, 
  onClose, 
  onAddNode,
  onPaste,
  onExport,
  onImport,
  canPaste 
}: BoardContextMenuProps) {
  return (
    <div
      className="fixed z-50 min-w-[180px] bg-white rounded-md shadow-lg border p-1"
      style={{
        left: x,
        top: y,
      }}
      onClick={e => e.stopPropagation()}
    >
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 text-sm"
        onClick={() => {
          onAddNode();
          onClose();
        }}
      >
        <PlusCircle className="h-4 w-4" />
        Add Screen
      </Button>

      <Button
        variant="ghost"
        className="w-full justify-start gap-2 text-sm"
        onClick={() => {
          onPaste();
          onClose();
        }}
        disabled={!canPaste}
      >
        <Clipboard className="h-4 w-4" />
        Paste
      </Button>

      <Button
        variant="ghost"
        className="w-full justify-start gap-2 text-sm"
        onClick={() => {
          onExport();
          onClose();
        }}
      >
        <Upload className="h-4 w-4" />
        Export Flow
      </Button>

      <Button
        variant="ghost"
        className="w-full justify-start gap-2 text-sm"
        onClick={() => {
          onImport();
          onClose();
        }}
      >
        <Download className="h-4 w-4" />
        Import Flow
      </Button>
    </div>
  );
}