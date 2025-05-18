import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { InventoryService } from './inventory.service';
import { Logger } from '@nestjs/common';

interface RewardInventoryItemPayload {
  userId: string;
  items: string[];
}

@Processor('events')
export class InventoryProcessor extends WorkerHost {
  private readonly logger = new Logger(InventoryProcessor.name);

  constructor(private readonly inventoryService: InventoryService) {
    super();
  }

  @Process('reward_inventory_item')
  async handleRewardInventoryItem(job: Job<RewardInventoryItemPayload>) {
    this.logger.debug(`Processing reward_inventory_item job ${job.id}`);
    const { userId, items } = job.data;

    try {
      // Process each item
      for (const itemId of items) {
        await this.inventoryService.rewardItem(userId, itemId);
      }

      this.logger.debug(`Successfully processed reward_inventory_item job ${job.id}`);
    } catch (error) {
      this.logger.error(
        `Failed to process reward_inventory_item job ${job.id}: ${error.message}`,
        error.stack,
      );
      throw error; // Let BullMQ handle retries
    }
  }
} 