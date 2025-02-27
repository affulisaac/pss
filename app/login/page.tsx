import { Suspense } from "react";
import Script from "next/script";
import { Code2, Smartphone, Store } from "lucide-react";
import { LoginContent } from "@/components/common/login";

const features = [
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "USSD Simulation",
    description:
      "Test your USSD services across different mobile devices with real-time interaction flow.",
  },
  {
    icon: <Store className="h-8 w-8" />,
    title: "Hubtel Mall Integration",
    description:
      "Preview how your service will appear and function within the Hubtel Web App and Mobile App",
  },
  {
    icon: <Code2 className="h-8 w-8" />,
    title: "Flow Builder",
    description:
      "Design and visualize your service flow with our intuitive drag-and-drop builder.",
  },
];

const BASE_URL = "https://auth.hubtel.com";

// Main page component
export default function LoginPage() {
  return (
    <>
      <Script src={`${BASE_URL}/js/v1/auth.js`} strategy="beforeInteractive" />
      <div className="flex">
        {/* Left side - Content */}
        <div className="hidden lg:flex w-1/2 bg-white text-gray-800">
          <div className="relative w-full">
            <div className="p-12 flex flex-col h-full">
              <div>
                <div className="w-16 h-16 rounded-xl bg-white shadow-lg p-3 mb-8">
                  <Smartphone
                    width={40}
                    height={40}
                    className="rounded-lg text-primary"
                  />
                </div>
                <h1 className="text-4xl font-bold mb-4 text-gray-900">
                  Hubtel Programmable Service Simulator
                </h1>
                <p className="text-lg mb-12 text-gray-600">
                  A testing environment for your programmable service. Simulate,
                  test, and perfect your service before going live.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                  >
                    <div className="bg-primary/5 rounded-lg p-3 w-fit mb-4">
                      <div className="text-primary">{feature.icon}</div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} Hubtel. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login */}
        <div className="flex-1 bg-background">
          <Suspense fallback={<div className="w-full" />}>
            <LoginContent />
          </Suspense>
        </div>
      </div>
    </>
  );
}