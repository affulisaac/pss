'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/common/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/tabs";

interface CorsInstructionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CorsInstructionsDialog({ open, onOpenChange }: CorsInstructionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>CORS Configuration Guide</DialogTitle>
          <DialogDescription>
            Learn how to handle CORS for local development and testing
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="extension" className="mt-4 ">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="extension">Browser Extension</TabsTrigger>
            <TabsTrigger value="tunnel">Local Tunnel</TabsTrigger>
          </TabsList>

          <TabsContent value="extension" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-medium">Using CORS Browser Extensions</h3>
              
              <div className="space-y-2">
                <p className="text-sm">1. Install a CORS extension for your browser:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>
                    Chrome: <a href="https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Allow CORS</a>
                  </li>
                  <li>
                    Firefox: <a href="https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CORS Everywhere</a>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-sm">2. Enable the extension:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Click the extension icon in your browser toolbar</li>
                  <li>Toggle the extension to enable CORS bypass</li>
                  <li>Refresh the simulator page</li>
                </ul>
              </div>

              <div className="rounded-md bg-muted p-3">
                <p className="text-sm text-muted-foreground">
                  Note: Only use CORS extensions for local development and testing. 
                  For production, properly configure CORS on your server.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tunnel" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-medium">Using Local Tunnel (ngrok)</h3>
              
              <div className="space-y-2">
                <p className="text-sm">1. Install ngrok:</p>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm">npm install -g ngrok</code>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm">2. Start your local server (example port 3000):</p>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm">npm run dev</code>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm">3. Create tunnel to your local server:</p>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm">ngrok http 3000</code>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm">4. Use the ngrok URL:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Copy the HTTPS URL provided by ngrok</li>
                  <li>Use this URL as your interaction endpoint in the simulator</li>
                </ul>
              </div>

              <div className="rounded-md bg-muted p-3">
                <p className="text-sm text-muted-foreground">
                  Note: The free version of ngrok will generate a new URL each time you restart it
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}