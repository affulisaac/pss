'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/dialog';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import { DialogClose } from '@radix-ui/react-dialog';

interface SaveFlowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flowName: string;
  onFlowNameChange: (name: string) => void;
  onSave: () => void;
}

export function SaveFlowDialog({
  open,
  onOpenChange,
  flowName,
  onFlowNameChange,
  onSave,
}: SaveFlowDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Flow</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e)=> {
          e.preventDefault();
          onSave()
          }} className="space-y-4 pt-4">
          <Input
            placeholder="Flow name"
            value={flowName}
            onChange={(e) => onFlowNameChange(e.target.value)}
            autoFocus
          />
          <div className="flex justify-end gap-3 ">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" >
              Save Flow
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}