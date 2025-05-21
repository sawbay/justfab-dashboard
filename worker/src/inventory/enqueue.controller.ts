import { Controller, Post, Body } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { INVENTORY_QUEUE } from './inventory.processor';

@Controller('inventory/enqueue')
export class InventoryEnqueueController {
  constructor(
    @InjectQueue(INVENTORY_QUEUE) private readonly queue: Queue
  ) { }

  @Post('reward_welcome_chest')
  async enqueueRewardWelcomeChest(
    @Body() body: { userId: string; itemIds: string[] }
  ) {
    const { userId, itemIds } = body;
    await this.queue.add('reward_welcome_chest', { userId, itemIds });
    return { success: true };
  }
} 