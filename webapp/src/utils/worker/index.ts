import axios from "axios";
import { WORKER_URL } from "../env";
import { ItemType } from "@/types/item_types";

export class Worker {
  private readonly workerUrl: string;

  constructor(workerUrl: string) {
    this.workerUrl = workerUrl;
  }

  async health() {
    return await axios.get(`${this.workerUrl}/health`);
  }

  async enqueueEvent(event: WorkerEvent) {
    return await axios.post(`${this.workerUrl}/queue/enqueue`, { event });
  }

  async openChest(userId: string, chestId: string) {
    return await axios.post(`${this.workerUrl}/open-chest`, { userId, chestId });
  }
}

export const worker = new Worker(WORKER_URL);

export enum WorkerEventType {
  REWARD_WELCOME_CHEST,
}

export interface WorkerEvent {
  etype: number;
  userId: string;
  payload: WelcomeChestEventPayload | UseEventPayload;
}

export interface WelcomeChestEventPayload {
  userId: string;
}

export interface UseEventPayload {
  userId: string;
  itemType: ItemType;
}
