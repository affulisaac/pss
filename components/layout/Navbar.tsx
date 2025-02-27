"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Code2,
  Smartphone,
  Store,
  Network,
  LogOut,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/common/button";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/hooks/use-app-state";
import Image from "next/image";
import { useClientSession } from "@/hooks/use-auth-status";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pathname = usePathname();
  const { logout } = useAuth();
  const { formState, updateFormState } = useAppStore();
  const { user } = useClientSession();

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
      console.log(user.email);
    }
  }, [user]);

  const navigation = [
    { name: "Simulator", href: "/", icon: Smartphone },
    { name: "Flow Builder", href: "/flow-builder", icon: Network },
  ];

  const platforms = [
    { name: "USSD", value: "USSD", icon: Smartphone },
    { name: "Hubtel Mall", value: "HUBTEL-MALL", icon: Store },
  ];

  const handlePlatformChange = (platform: string) => {
    updateFormState({
      ...formState,
      platform,
      operator: platform === "HUBTEL-MALL" ? "Webstore" : formState.operator,
      device: platform === "HUBTEL-MALL" ? "web" : formState.device,
    });
  };

  return (
    <nav className="bg-white border-b fixed top-0 left-0 right-0" style={{ zIndex: 1000 }}>
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                src="/logo-hub.png"
                alt="Hubtel Logo"
                width={100}
                height={30}
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        isActive
                          ? "bg-primary/5 text-primary"
                          : "text-gray-600 hover:text-primary hover:bg-primary/5",
                        "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {pathname === "/" && (
            <div className="hidden md:flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
              {platforms.map((platform) => (
                <Button
                  key={platform.value}
                  variant={
                    formState.platform === platform.value ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => handlePlatformChange(platform.value)}
                  className={cn(
                    "gap-2",
                    formState.platform === platform.value &&
                      "text-primary-foreground"
                  )}
                >
                  <platform.icon className="h-4 w-4" />
                  {platform.name}
                </Button>
              ))}
            </div>
          )}

          <div className="hidden md:block">
            <div className="ml-4 flex items-center gap-4">
              {userEmail && (
                <>
                  <span className="text-sm text-gray-600">{userEmail}</span>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="gap-2"
                  >
                    {userEmail && <LogOut className="h-4 w-4" />}
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary hover:bg-primary/5 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    isActive
                      ? "bg-primary/5 text-primary"
                      : "text-gray-600 hover:text-primary hover:bg-primary/5",
                    "block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}

            {pathname === "/" && (
              <div className="mt-4 space-y-1">
                <div className="px-3 py-2 text-sm font-medium text-gray-600">
                  Platform
                </div>
                {platforms.map((platform) => (
                  <Button
                    key={platform.value}
                    variant={
                      formState.platform === platform.value
                        ? "default"
                        : "ghost"
                    }
                    size="sm"
                    onClick={() => {
                      handlePlatformChange(platform.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full justify-start gap-2",
                      formState.platform === platform.value &&
                        "text-primary-foreground"
                    )}
                  >
                    <platform.icon className="h-4 w-4" />
                    {platform.name}
                  </Button>
                ))}
              </div>
            )}

            {userEmail && (
              <>
                <div className="px-3 py-2 text-sm text-gray-600">
                  {userEmail}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="w-full justify-start gap-2 px-3"
                >
                  {userEmail && <LogOut className="h-4 w-4" />}
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
