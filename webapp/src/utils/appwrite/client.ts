import { Client } from "appwrite";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "../env";

export const getClient = () => {
  return new Client()
    .setProject(APPWRITE_PROJECT_ID)
    .setEndpoint(APPWRITE_ENDPOINT);
}

export default getClient;