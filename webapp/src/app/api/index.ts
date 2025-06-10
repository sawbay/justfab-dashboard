import { WorkerEvent } from "@/utils/worker";
import axios from "axios";

export const USERS_TELEGRAM_LOGIN = "/api/auth";
export const USERS_FUTUREPASS_LINK = "/api/appwrite/users/futurepass/link";
export const WORKER_EVENTS = "/api/appwrite/worker_events";
export const USERS_GET = "/api/users/get";

export const fireEvent = async (event: WorkerEvent) => {
  try {
    await axios.post("api/appwrite/worker_events", { event });
  } catch (error) {
    console.error(error);
  }
}
