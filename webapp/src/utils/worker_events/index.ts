import axios from "axios";
import { WORKER_EVENTS } from "@/app/api/routes";

export const fireEvent = async (event: WorkerEvent) => {
  // TODO: must pass session or token to backend validation

  try {
    await axios.post(WORKER_EVENTS, { event });
  } catch (error) {
    console.error(error);
  }
}

export enum WorkerEventType {
  REWARD_WELCOME_CHEST,
}

export interface WorkerEvent {
  etype: number;
  payload: any;
}
