'use client';

import { ChevronLeft } from "lucide-react";
import { NomineeData, ResponseType } from "@/lib/types";
import { useAppStore } from "@/hooks/use-app-state";
import { Button } from "@/components/common/button";
import { StatusBar } from "../phone-simulator/StatusBar";
import { ScrollArea } from "@/components/common/scroll-area";
import { useUSSDSession } from "@/hooks/use-ussd-session";
import { Notch } from "../phone-simulator/Notch";
import { StartScreen } from "@/components/ui/StartScreen";
import { Input } from "@/components/common/input";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface MallScreenProps {
  theme: "ios" | "android";
  isLoading?: boolean;
}

export function MallScreen({ theme, isLoading }: MallScreenProps) {
  const { toast } = useToast();
  const { sessionResponse, setSessionResponse, setUserInput, userInput, formState } = useAppStore();
  const { sendRequest } = useUSSDSession();

  const handleSubmit = async (type: ResponseType, message: string) => {
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
     await sendRequest(type, message);
  };

  return (
    <div className="flex-1 bg-background">
      <Notch theme={formState.device} />
      <StatusBar theme={formState.device} operator={formState.operator} />

      {!sessionResponse?.type ? (
        <StartScreen 
          title="PS Simulator"
          description="Simulate your programmable service flow"
          buttonText="Start Simulation"
        />
      ) : (
        <>
           <div className="flex-1 bg-background">

      {/* Banner Image */}
      <div className="relative w-full h-40">
        <div className="absolute inset-0 bg-black/40" />

        {/* Logo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Image src="/logo-ser.png" alt="Service Logo" width={80} height={80} className=" object-cover" />
          {/* <div className="w-20 h-20 rounded-full bg-black border-2 border-white overflow-hidden"></div> */}
          <h1 className="text-xl font-semibold text-white mt-2">
            Service Name
          </h1>
        </div>

        {/* Back Button */}
        {/* <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-white hover:bg-white/20"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button> */}
      </div>
      <ScrollArea className="h-[calc(100%-200px)]">
        <div className="p-2 space-y-4">
          <p className=" mb-4">{sessionResponse.label}</p>

          <div className="">
            {sessionResponse.data?.map((item: NomineeData) => (
              <p
                key={item.value}
                className="w-full p-2 cursor-pointer border-b flex items-center justify-between h-14 hover:bg-gray-50"
                onClick={() => handleSubmit("response", item.value)}
              >
                <span className="text-base font-normal">{item.display}</span>
                <ChevronLeft className="h-5 w-5 ml-auto rotate-180" />
              </p>
            ))}
          </div>

          {sessionResponse.type?.toLocaleLowerCase() === "addtocart" && (
            <>
              <p>{sessionResponse.item?.itemName}</p>
              <p className="text-muted-foreground">
                Quantity: <span>{sessionResponse.item?.qty}</span>
              </p>
              <p className="mt-0 text-muted-foreground">
                Price: <span>{sessionResponse.item?.price}</span>
              </p>
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
              className="w-full mb-3  text-center"
            />
          )}
          {!['menu', 'select'].includes(sessionResponse.dataType)  && (
            <Button
              onClick={() => handleSubmit(sessionResponse?.type?.toLocaleLowerCase(), userInput)}
              type="submit"
               size="lg"
              className="text-lg text-sm text-white transition-colors w-full"
            >
              {sessionResponse?.type?.toLocaleLowerCase() === "addtocart"
                ? "Proceed to pay"
                : sessionResponse?.type?.toLocaleLowerCase() === "response"
                ? "Next"
                : "OK"}
            </Button>
          )}
        </div>
      </ScrollArea>
    </div>
        </>
      )}
    </div>
  );
}