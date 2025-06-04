import { Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { WorkerHost } from '@nestjs/bullmq';
import { Client, Databases, ID, Permission, Query, Role } from 'node-appwrite';
import getClient from 'src/queue/appwrite/server';
import { ItemType } from 'src/types';
import { WelcomeChestEventPayload } from './types';
import { ConfigService } from '@nestjs/config';

export const WELCOME_CHEST_QUEUE = 'welcome_chest_queue';

@Processor(WELCOME_CHEST_QUEUE)
@Injectable()
export class WelcomeChestProcessor extends WorkerHost {
  private readonly client: Client;
  private readonly DATABASE_ID: string;
  private readonly INVENTORY_COL_ID: string;

  constructor(
    @Inject() private readonly configService: ConfigService,
  ) {
    super();
    this.client = getClient(
      this.configService.get("APPWRITE_PROJECT_ID"),
      this.configService.get("APPWRITE_ENDPOINT"),
      this.configService.get("APPWRITE_KEY")
    );
    this.DATABASE_ID = this.configService.get("DATABASE_ID");
    this.INVENTORY_COL_ID = this.configService.get("INVENTORY_COL_ID");
  }

  async process(job: Job) {
    const data: WelcomeChestEventPayload = job.data;
    const databases = new Databases(this.client);
    const existingWelcomeChest = await databases.listDocuments(
      this.DATABASE_ID,
      this.INVENTORY_COL_ID,
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
        this.DATABASE_ID,
        this.INVENTORY_COL_ID,
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
        this.DATABASE_ID,
        this.INVENTORY_COL_ID,
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