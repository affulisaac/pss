'use client';

import { ReactFlowProvider } from 'reactflow';

export default function FlowBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReactFlowProvider>{children}</ReactFlowProvider>;
}