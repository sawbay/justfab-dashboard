import { Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { WorkerHost } from '@nestjs/bullmq';

export const WELCOME_CHEST_QUEUE = 'welcome_chest_queue';

@Processor(WELCOME_CHEST_QUEUE)
@Injectable()
export class WelcomeChestProcessor extends WorkerHost {
  constructor() {
    super();
  }

  async process(job: Job) {
    // const { userId, items } = job.data;
    // await this.inventoryService.rewardItems(userId, items);
  }
} 