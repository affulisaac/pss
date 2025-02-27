"use client";

import { useClientSession } from "@/hooks/use-auth-status";
import { eventPublisher } from "@/utils/event-publisher";
import { useEffect } from "react";

export default function ObservabilityInit() {
  const { user } = useClientSession();
  useEffect(() => {
    if(process.env.NODE_ENV !== 'production') return
    // eventPublisher.initObservability();
  });
  useEffect(() => {
    // if (user) {
    //   eventPublisher.setUser({
    //     id: user.email,
    //     email: user.email,
    //     name: user.email,
    //   });
    // }
  }, [user]);
  return null;
}
