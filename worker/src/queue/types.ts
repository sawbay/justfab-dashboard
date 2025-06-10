import { ItemType } from "src/types";

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