import { ItemType } from "@/types/item_types";
import axios from "axios";

export const fireEvent = async (event: WorkerEvent) => {
  try {
    await axios.post("api/appwrite/worker_events", { event });
  } catch (error) {
    console.error(error);
  }
}

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
