import { Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { WorkerHost } from '@nestjs/bullmq';
import { Client, Databases, ID, Permission, Query, Role } from 'node-appwrite';
import getClient from 'src/queue/appwrite/server';
import { DATABASE_ID, INVENTORY_COL_ID } from 'src/queue/appwrite/const';
import { ItemType } from 'src/queue/types';
import { WelcomeChestEventPayload } from './types';

export const WELCOME_CHEST_QUEUE = 'welcome_chest_queue';

@Processor(WELCOME_CHEST_QUEUE)
@Injectable()
export class WelcomeChestProcessor extends WorkerHost {
  private readonly client: Client;

  constructor() {
    super();
    this.client = getClient();
  }

  async process(job: Job) {
    const data: WelcomeChestEventPayload = job.data;
    const databases = new Databases(this.client);
    const existingWelcomeChest = await databases.listDocuments(
      DATABASE_ID,
      INVENTORY_COL_ID,
      [
        Query.equal("userId", data.userId),
        Query.equal("itemType", ItemType.WELCOME_CHEST)
      ]);

    if (existingWelcomeChest.total > 0) {
      job.log(`User ${data.userId} already rewarded welcome chest`);
      return; // already rewarded welcome chest
    }

    try {
      await databases.createDocument(
        DATABASE_ID,
        INVENTORY_COL_ID,
        ID.unique(),
        {
          userId: data.userId,
          itemType: ItemType.WELCOME_CHEST,
          used: false,
        },
        [
          Permission.read(Role.any()),
        ]
      );
      job.log(`User ${data.userId} has been rewarded welcome chest`);

      await databases.createDocument(
        DATABASE_ID,
        INVENTORY_COL_ID,
        ID.unique(),
        {
          userId: data.userId,
          itemType: ItemType.AURA_KEY,
          used: false,
        },
        [
          Permission.read(Role.any()),
        ]
      );
      job.log(`User ${data.userId} has been rewarded aura key`);
    } catch (error) {
      job.log(`Error rewarding welcome chest to user ${data.userId}: ${error}`);
      throw error;
    }
  }
}