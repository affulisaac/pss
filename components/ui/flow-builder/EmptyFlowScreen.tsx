'use client';

import { FileCode, Plus } from "lucide-react";
import { Button } from "@/components/common/button";
import { ussdTemplate } from "@/lib/templates/template-2";
import { mallTemplate } from "@/lib/templates/template-1";
import Link from "next/link";


interface EmptyFlowScreenProps {
  onNewFlow: () => void;
  onImportTemplate: (template: any) => void;
  onImportNewFlow: () => void;
}

export function EmptyFlowScreen({ onNewFlow, onImportTemplate, onImportNewFlow }: EmptyFlowScreenProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome to Flow Builder
          </h1>
          <p className="text-gray-500">
            Create, visualize, and test your programmable service flows
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Blank Flow */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="h-32 flex items-center justify-center border-2 border-dashed rounded-lg mb-4 bg-gray-50">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-medium mb-2">Start from scratch</h3>
              <p className="text-sm text-gray-500 mb-4">
                Create a new flow with a blank canvas
              </p>
              <div className="space-y-2">
              <Button onClick={onNewFlow} className="w-full">
                Create blank flow
              </Button>
              <Button onClick={onImportNewFlow} className="w-full">
                Import saved flow
              </Button>
              </div>
            </div>
          </div>

          {/* Templates */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="h-32 flex items-center justify-center border-2 border-dashed rounded-lg mb-4 bg-gray-50">
                <FileCode className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-medium mb-2">Start from template</h3>
              <p className="text-sm text-gray-500 mb-4">
                Choose from our pre-built templates
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onImportTemplate(ussdTemplate)}
                >
                  Template 1
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onImportTemplate(mallTemplate)}
                >
                  Template 2
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-primary">
            <Link href="https://dev-docs.hubtel.com/tools/programmable-service-simulator.html"> Need help? Check out our documentation or contact support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}