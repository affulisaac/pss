"use client";

import { Redis } from "@upstash/redis";
import { StorageProvider } from "./types";
import { Flow } from "@/lib/types/flow";
import { FlowWithOwner } from "./types";

const FLOW_KEY_PREFIX = "flow:";
const USER_FLOWS_PREFIX = "user-flows:";
const SHARED_FLOWS_KEY = "shared-flows";

export class RedisStorageProvider implements StorageProvider {
  private redis: Redis;

  constructor(url: string, token: string) {
    this.redis = new Redis({
      url,
      token,
    });
  }

  async saveFlow(flow: Flow, email?: string): Promise<void> {
    try {
      const flowWithOwner: FlowWithOwner = {
        ...flow,
        owner: email,
        isShared: !email,
      };

      // Store the flow data
      const flowKey = `${FLOW_KEY_PREFIX}${flow.id}`;
      await this.redis.set(flowKey, JSON.stringify(flowWithOwner));

      if (email) {
        // Add to user's flows set
        await this.redis.sadd(`${USER_FLOWS_PREFIX}${email}`, flow.id);
      } else {
        // Add to shared flows set
        await this.redis.sadd(SHARED_FLOWS_KEY, flow.id);
      }
    } catch (error) {
      console.error("Error saving flow to Redis:", error);
      throw error;
    }
  }

  async loadFlows(email?: string): Promise<Flow[]> {
    try {
      let flowIds: string[] = [];
      if (email) {
        flowIds = await this.redis.smembers(`${USER_FLOWS_PREFIX}${email}`);
      }
      // Get all flows in parallel
      const flowPromises = flowIds.map(async (id) => {
        const flowData = await this.redis.get(`${FLOW_KEY_PREFIX}${id}`);
        console.log("flowData", flowData);
        return typeof flowData === "string" ? JSON.parse(flowData) : flowData;
      });

      const flows = await Promise.all(flowPromises);
      return flows.filter((flow): flow is Flow => flow !== null);
    } catch (error) {
      console.error("Error loading flows from Redis:", error);
      return [];
    }
  }

  async loadFlow(id: string): Promise<Flow | null> {
    try {
      const flowData = await this.redis.get(`${FLOW_KEY_PREFIX}${id}`);
      return typeof flowData === "string" ? JSON.parse(flowData) : null;
    } catch (error) {
      console.error("Error loading flow from Redis:", error);
      return null;
    }
  }

  async deleteFlow(id: string, email?: string): Promise<void> {
    try {
      // Get the flow to check ownership
      const flowData = await this.redis.get<string>(`${FLOW_KEY_PREFIX}${id}`);
      if (!flowData) return;

      const flow: FlowWithOwner = JSON.parse(flowData);

      // Check authorization
      if (flow.owner && flow.owner !== email) {
        throw new Error("Unauthorized to delete this flow");
      }

      // Delete the flow data
      await this.redis.del(`${FLOW_KEY_PREFIX}${id}`);

      if (email) {
        // Remove from user's flows
        await this.redis.srem(`${USER_FLOWS_PREFIX}${email}`, id);
      } else {
        // Remove from shared flows
        await this.redis.srem(SHARED_FLOWS_KEY, id);
      }
    } catch (error) {
      console.error("Error deleting flow from Redis:", error);
      throw error;
    }
  }
}
