import { Client } from "appwrite";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "../env";

const client = new Client();

client
  .setProject(APPWRITE_PROJECT_ID)
  .setEndpoint(APPWRITE_ENDPOINT);

export default client;