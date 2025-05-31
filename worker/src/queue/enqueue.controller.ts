import { Controller, Post, Body } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { WELCOME_CHEST_QUEUE } from './queues/welcome-chest.processor';

@Controller('queue/enqueue')
export class EnqueueController {
  constructor(
    @InjectQueue(WELCOME_CHEST_QUEUE) private readonly welcomeChestQueue: Queue
  ) { }

  @Post('reward_welcome_chest')
  async enqueueRewardWelcomeChest(
    @Body() body: { userId: string; itemIds: string[] }
  ) {
    const { userId, itemIds } = body;
    const jobName = `${WELCOME_CHEST_QUEUE}_${userId}`;
    await this.welcomeChestQueue.add(jobName, { userId, itemIds });
    return { success: true };
  }
} 