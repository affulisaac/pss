'use client';

import { Button } from '@/components/common/button';
import { PlusCircle, Save, Upload, Play, Undo2, Redo2, Copy, Clipboard, Download, Share2, Camera } from 'lucide-react';
import { Panel } from 'reactflow';

interface ToolbarProps {
  onAddNode: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onSimulate: () => void;
  onExport: () => void;
  onImport: () => void;
  onShare: () => void;
  onExportImage: () => void;
  canCopy: boolean;
  activeFlowId: string | null;
  canPaste: boolean;
  canUndo: boolean;
  canRedo: boolean;
}

export function Toolbar({
  onAddNode,
  onCopy,
  onPaste,
  onUndo,
  onRedo,
  onSave,
  onSimulate,
  onExport,
  onImport,
  onExportImage,
  onShare,
  canCopy,
  canPaste,
  activeFlowId,
  canUndo,
  canRedo,
}: ToolbarProps) {
if (!activeFlowId) return null;

  return (
    <Panel position="top-left" className="flex gap-2">
      <Button 
        onClick={onAddNode} 
        size="sm" 
        className="gap-2"
        variant="outline" 
      >
        <PlusCircle className="h-4 w-4" />
        Add Screen
      </Button>
      
      {/* <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={onCopy}
        disabled={!canCopy}
      >
        <Copy className="h-4 w-4" />
        Copy
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={onPaste}
        disabled={!canPaste}
      >
        <Clipboard className="h-4 w-4" />
        Paste
      </Button> */}

      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={onUndo}
        disabled={!canUndo}
      >
        <Undo2 className="h-4 w-4" />
        Undo
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={onRedo}
        disabled={!canRedo}
      >
        <Redo2 className="h-4 w-4" />
        Redo
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={onSave}
      >
        <Save className="h-4 w-4" />
        Save Flow
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={onSimulate}
      >
        <Play className="h-4 w-4" />
        Simulate
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={onImport}
      >
         <Download className="h-4 w-4" />
        Import
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={onExport}
      >
        <Upload className="h-4 w-4" />
        Export
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={onExportImage}
      >
        <Camera className="h-4 w-4" />
        Save as Image
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={onShare}
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
    </Panel>
  );
}