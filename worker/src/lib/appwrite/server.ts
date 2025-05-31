import { Client } from "node-appwrite";
import { APPWRITE_ENDPOINT, APPWRITE_KEY, APPWRITE_PROJECT_ID } from "./const";

export const getClient = () => {
  const client = new Client()
    .setProject(APPWRITE_PROJECT_ID)
    .setEndpoint(APPWRITE_ENDPOINT)
    .setKey(APPWRITE_KEY);
  return client;
}

export default getClient;