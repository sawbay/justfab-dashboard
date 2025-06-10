import { Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { WorkerHost } from '@nestjs/bullmq';
import { UseWelcomeChestService } from '../services/use-welcome-chest.service';

export const USE_QUEUE = 'use_queue';

@Processor(USE_QUEUE)
@Injectable()
export class UseProcessor extends WorkerHost {
  constructor(
    @Inject() private readonly useWelcomeChestService: UseWelcomeChestService,
  ) {
    super();
  }

  async process(job: Job) {
    //   const data: WelcomeChestEventPayload = job.data;
    //   const databases = new Databases(this.client);
    //   const existingWelcomeChest = await databases.listDocuments(
    //     this.DATABASE_ID,
    //     this.INVENTORY_COL_ID,
    //     [
    //       Query.equal("userId", data.userId),
    //       Query.equal("itemType", ItemType.WELCOME_CHEST)
    //     ]);

    //   if (existingWelcomeChest.total > 0) {
    //     job.log(`User ${data.userId} already rewarded welcome chest`);
    //     return; // already rewarded welcome chest
    //   }

    //   try {
    //     await databases.createDocument(
    //       this.DATABASE_ID,
    //       this.INVENTORY_COL_ID,
    //       ID.unique(),
    //       {
    //         userId: data.userId,
    //         itemType: ItemType.WELCOME_CHEST,
    //         used: false,
    //       },
    //       [
    //         Permission.read(Role.any()),
    //       ]
    //     );
    //     job.log(`User ${data.userId} has been rewarded welcome chest`);

    //     await databases.createDocument(
    //       this.DATABASE_ID,
    //       this.INVENTORY_COL_ID,
    //       ID.unique(),
    //       {
    //         userId: data.userId,
    //         itemType: ItemType.AURA_KEY,
    //         used: false,
    //       },
    //       [
    //         Permission.read(Role.any()),
    //       ]
    //     );
    //     job.log(`User ${data.userId} has been rewarded aura key`);
    //   } catch (error) {
    //     job.log(`Error rewarding welcome chest to user ${data.userId}: ${error}`);
    //     throw error;
    //   }
  }
}