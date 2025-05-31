import { Client } from "node-appwrite";

const client = new Client();
client
  .setEndpoint('https://appwrite.botocean.network/v1')
  .setProject('683a98fb000ab06badff')
  .setKey('standard_381075f55391390ac797ccfe19c8ed8e3093f9b1429bcd16a5a50e5603073ca5860601aa6da7fcf420fc1b9e68bb789ef066e7891d141c82a43b4bc8e8c445e02e46db11c9919cf0c126a3079ead991b87881f5c1e164065da183bfcdbd87fd795a5a3debd15dea53ac3fc17fe4ccfed68e06d945925c62814a37f3c8b63df59');

export default client;