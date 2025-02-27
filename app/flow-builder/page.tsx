'use client';

import  FlowBuilder  from '@/components/ui/flow-builder/FlowBuilder';
import { Suspense } from 'react';
import { ReactFlowProvider } from 'reactflow';



function FlowBuilderContent() {
  return (
    <div className="bg-background">
      <div className=" mx-auto">
        <div className="bg-white ">
          <ReactFlowProvider>
            <FlowBuilder />
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}

export default function FlowBuilderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
          <div className="text-lg font-medium">Loading...</div>
        </div>
      </div>
    }>
      <FlowBuilderContent />
    </Suspense>
  );
}