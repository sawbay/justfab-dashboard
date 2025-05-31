import { Client } from "node-appwrite";
import { APPWRITE_ENDPOINT, APPWRITE_KEY, APPWRITE_PROJECT_ID } from "../env";

const client = new Client()
  .setProject(APPWRITE_PROJECT_ID)
  .setEndpoint(APPWRITE_ENDPOINT)
  .setKey(APPWRITE_KEY);

export default client;