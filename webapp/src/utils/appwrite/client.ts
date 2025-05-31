import { Client } from "appwrite";

const client = new Client();

client
  .setEndpoint('https://appwrite.botocean.network/v1')
  .setProject('683a98fb000ab06badff');

export default client;