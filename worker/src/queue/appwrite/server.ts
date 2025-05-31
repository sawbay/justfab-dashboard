import { Client } from "node-appwrite";

export const getClient = (projectId: string, endpoint: string, key: string) => {
  const client = new Client()
    .setProject(projectId)
    .setEndpoint(endpoint)
    .setKey(key);
  return client;
}

export default getClient;