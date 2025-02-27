"use client";

import {
  PlusCircle,
  MoreVertical,
  Trash2,
  Download,
  Copy,
  Pencil,
  ChevronLeft,
  Upload,
} from "lucide-react";
import { Button } from "@/components/common/button";
import { ScrollArea } from "@/components/common/scroll-area";
import { cn } from "@/lib/utils";
import { Flow } from "@/lib/types/flow";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/common/dropdown-menu";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/common/dialog";
import { Input } from "@/components/common/input";
import { DialogClose } from "@radix-ui/react-dialog";

interface FlowSidebarProps {
  flows: Flow[];
  activeFlowId: string | null;
  onFlowSelect: (flow: Flow) => void;
  onNewFlow: () => void;
  onDeleteFlow: (id: string) => void;
  onExportFlow: (flow: Flow) => void;
  onDuplicateFlow: (flow: Flow) => void;
  onRenameFlow: (id: string, newName: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function FlowSidebar({
  flows,
  activeFlowId,
  onFlowSelect,
  onNewFlow,
  onDeleteFlow,
  onExportFlow,
  onDuplicateFlow,
  onRenameFlow,
  isCollapsed,
  onToggleCollapse,
}: FlowSidebarProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [flowToRename, setFlowToRename] = useState<Flow | null>(null);
  const [newName, setNewName] = useState("");
  
  // If you need local state, sync it with the parent's state
  const [localCollapsed, setLocalCollapsed] = useState(isCollapsed);
  
  useEffect(() => {
    setLocalCollapsed(isCollapsed);
  }, [isCollapsed]);
  
  const handleToggleCollapse = () => {
    setLocalCollapsed(!localCollapsed);
    onToggleCollapse();
  };

  const handleRename = () => {
    if (flowToRename && newName.trim()) {
      onRenameFlow(flowToRename.id, newName.trim());
      setIsRenaming(false);
      setFlowToRename(null);
      setNewName("");
    }
  };

  const startRename = (flow: Flow) => {
    setFlowToRename(flow);
    setNewName(flow.name);
    setIsRenaming(true);
  };

  return (
    <div
      className={cn(
        "border-r bg-background transition-all duration-300 ease-in-out fixed left-0 top-16 bottom-0 z-30",
        localCollapsed ? "w-12" : "w-64"
      )}
    >
      <div className="flex items-center justify-between border-b" style={{padding: "2px"}}>
        {!localCollapsed && <h3 className="font-medium px-4">Saved Flows</h3>}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleCollapse}
          className="shrink-0"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              localCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      {!localCollapsed && (
        <div className="flex flex-col h-[calc(100vh-4rem-32px)]">
          <div className="p-4">
            <Button onClick={onNewFlow} className="w-full gap-2 mb-4">
              <PlusCircle className="h-4 w-4" />
              New Flow
            </Button>
          </div>

          <ScrollArea className="flex-1 px-4 pb-4">
            <div className={cn("space-y-2")}>
              {flows.map((flow) => (
                <div
                  style={{ width: "220px" }}
                  key={flow.id}
                  className={cn(
                    "rounded-lg border transition-colors w-220",
                    activeFlowId === flow.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted",
                    localCollapsed ? "p-2" : "p-3"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className="flex-1 cursor-pointer min-w-0"
                      onClick={() => onFlowSelect(flow)}
                    >
                      {localCollapsed ? (
                        <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-md">
                          <span className="text-lg font-medium text-primary">
                            {flow.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      ) : (
                        <>
                          <h4 className="font-medium truncate">{flow.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {new Date(flow.updatedAt).toLocaleDateString()}
                          </p>
                        </>
                      )}
                    </div>
                    {!localCollapsed && (
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => startRename(flow)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDuplicateFlow(flow)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onExportFlow(flow)}>
                            <Upload className="h-4 w-4 mr-2" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDeleteFlow(flow.id)}
                            className="text-red-600 focus:text-red-600 focus:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      
      {localCollapsed && (
        <div className="pt-4 flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full mb-4"
            onClick={onNewFlow}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
          
          <div className="space-y-3">
            {flows.map((flow) => (
              <div
                key={flow.id}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-md cursor-pointer",
                  activeFlowId === flow.id
                    ? "bg-primary/20 text-primary"
                    : "bg-muted hover:bg-muted/80"
                )}
                onClick={() => onFlowSelect(flow)}
                title={flow.name}
              >
                <span className="text-sm font-medium">
                  {flow.name.charAt(0).toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <Dialog open={isRenaming} onOpenChange={setIsRenaming}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Flow</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault(), handleRename();
            }}
            className="space-y-4 pt-4"
          >
            <Input
              placeholder="Flow name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-3 ">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" >
                Rename Flow
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}