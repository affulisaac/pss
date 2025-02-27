import pkg from "@/package.json";
import { HubtelEventPub } from "@hubtel/event-publisher";

const { version } = pkg || {};
export const eventPublisher = new HubtelEventPub({
  appId: "f874a23e-e0ab-4711-9d6f-6ea300e16d49", 
  clientToken: "pube6df94c2643bc3b7eeb526fe198339e8",
  appName: "hubtel.tooling.programmableservicesimulator.frontend",    
  appVersion: version, 
  developerMode: false,
  sectionName: "application-id", 
  eventAnalyticsApiToken: "your-event-analytics-api-token", 
  sendToEventAnalytics: false,
  sendToEventsPortal: false,
  
});