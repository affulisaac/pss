'use client';

import { useState } from 'react';
import { Copy, Share2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/dialog';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import { useToast } from '@/hooks/use-toast';
import { Flow } from '@/lib/types/flow';
import { StorageFactory } from '@/lib/services/storage/storage-factory';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flow: Flow;
}

export function ShareDialog({ open, onOpenChange, flow }: ShareDialogProps) {
  const { toast } = useToast();
  const [shareUrl, setShareUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateShareUrl = async () => {
    setIsGenerating(true);
    try {
      // Save the flow first
      const provider = StorageFactory.createProvider({ provider: 'local' });
      await provider.saveFlow(flow);
      
      // Generate the share URL with the flow ID
      const url = `${window.location.origin}/flow-builder?id=${flow.id}`;
      setShareUrl(url);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate share link",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Success",
        description: "Share link copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Flow</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Button 
            onClick={generateShareUrl}
            className="w-full gap-2"
            disabled={isGenerating}
          >
            <Share2 className="h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate Share Link'}
          </Button>
          
          {shareUrl && (
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}