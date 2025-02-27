'use client';

import { cn } from "@/lib/utils";
import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";
import { useAppStore } from "@/hooks/use-app-state";
import { useUSSDSession } from "@/hooks/use-ussd-session";
import { StartScreen } from "@/components/ui/StartScreen";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/select";
import { useToast } from "@/hooks/use-toast";
interface WebScreenProps {
  isLoading?: boolean;
}

export function WebScreen({ isLoading }: WebScreenProps) {
  const { sessionResponse, setUserInput, userInput, setSessionResponse } = useAppStore();
  const { sendRequest } = useUSSDSession();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    const type = sessionResponse?.type;
    e.preventDefault();
    if (type === "release") {
      setSessionResponse({})
      return
    }
    if(type?.toLowerCase() === 'addtocart') {
      setSessionResponse({})
      toast({
        variant: "default",
        title: "Payment Initiated",
        description: "The user will be redirected to the checkout page",
      });
      return
    }
    if (["Release"].includes(sessionResponse.type)) {
      setSessionResponse({})
      return;
    }
    const requestType = sessionResponse.type?.toLowerCase() === "addtocart" ? "AddToCart" : "response";
    await sendRequest(requestType);
    setUserInput("");
  };

  const handleSelect = (value: string) => {
    setUserInput(value);
  };

  if (!sessionResponse?.type) {
    return (
      <StartScreen 
        title="Web PS Simulator"
        description="This simulator provides a similar experience to how your programable service will behave on the Hubtel. Configure it and click on the start button to begin"
        buttonText="Start Session"
      />
    );
  }

  return (
    <div className="h-full  bg-neutral-800 p-8 flex items-center justify-center">
      <div
        className={cn(
          "w-full max-w-lg bg-white rounded-xl  p-8",
          isLoading && "animate-pulse"
        )}
      >
        <div className="space-y-6">
          <div className="space-y-2">
           {sessionResponse.type?.toLowerCase() !== 'addtocart' && ( <p className="text-gray-500">{sessionResponse?.label}</p>)}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {["select", "menu", "confirm"].includes(sessionResponse.dataType) && (
              <Select onValueChange={handleSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {sessionResponse?.data?.map((item: any) => (
                    <SelectItem key={item?.value} value={item?.value}>
                      {item.display}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
                
                {sessionResponse.type?.toLocaleLowerCase() === 'addtocart' && (
              <>
              <p>{sessionResponse.item?.itemName}</p>
              <p  className="text-muted-foreground">Quantity: <span>{sessionResponse.item?.qty}</span></p>
              <p className="mt-0 text-muted-foreground">Price: <span>{sessionResponse.item?.price}</span></p>
              </>
            )}
            {sessionResponse.dataType === "input" && (
              <Input
                type="text"
                placeholder={
                  sessionResponse.fieldType === "phone"
                    ? "Enter phone number"
                    : "Enter value"
                }
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full h-12 text-lg"
              />
            )}
            <Button
              type="submit"
              className="text-lg text-sm text-white transition-colors"
            >
              {sessionResponse?.type?.toLocaleLowerCase() === "addtocart"
              ? "Proceed to pay"
              : sessionResponse?.type?.toLocaleLowerCase() === "response"
              ? "Next"
              : "OK"}
            </Button>
          </form>

          {sessionResponse.type === "release" && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">{sessionResponse.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}