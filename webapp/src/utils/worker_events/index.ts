import axios from "axios";
import { WORKER_EVENTS } from "@/app/api/routes";

export const fireEvent = async (event: WorkerEvent) => {
  await axios.post(WORKER_EVENTS, { event });
}

export enum WorkerEventType {
  REWARD_WELCOME_CHEST,
}

export interface WorkerEvent {
  etype: number;
  payload: any;
}
