import { FUNCTION_ID } from "../env";
import { ItemType } from "@/types/item_types";
import { Client, ExecutionMethod, Functions } from "appwrite";

export interface ResponseBody {
  success: boolean;
  data?: any;
  error?: string;
}

export class BackendService {
  private readonly client: Client;
  private readonly functions: Functions;

  constructor(client: Client) {
    this.client = client;
    this.functions = new Functions(this.client);
  }

  async proxiedApi(path: string, method: ExecutionMethod, body?: any): Promise<ResponseBody> {
    const response = await this.functions.createExecution(
      FUNCTION_ID,
      body ? JSON.stringify(body) : undefined,
      false,
      path,
      method,
      {
        "Content-Type": "application/json",
      }
    );

    const responseStatusCode = response.responseStatusCode;
    const responseBody: ResponseBody = JSON.parse(response.responseBody);
    console.log(`api: ${path} status: ${responseStatusCode} body: `, responseBody);

    if (!responseBody.success) {
      throw new Error(responseBody.error!);
    }

    return responseBody.data;
  }

  health() {
    return this.proxiedApi("/health", ExecutionMethod.GET);
  }

  linkFuturepass(futurepass: string) {
    return this.proxiedApi("/users/link_futurepass", ExecutionMethod.POST, { futurepass });
  }

  openChest(chestId: string) {
    return this.proxiedApi("/open-chest", ExecutionMethod.POST, { chestId });
  }

  enqueueEvent(event: WorkerEvent) {
    return this.proxiedApi("/queue/enqueue", ExecutionMethod.POST, { event });
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
