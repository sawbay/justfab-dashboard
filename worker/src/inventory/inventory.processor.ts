import { Processor, Process } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { InventoryService } from './inventory.service';
import { Injectable } from '@nestjs/common';

export const INVENTORY_QUEUE = 'inventory_queue';

@Processor(INVENTORY_QUEUE)
@Injectable()
export class InventoryProcessor {
  constructor(private readonly inventoryService: InventoryService) {}

  @Process('reward_inventory_item')
  async handleRewardInventoryItem(job: Job) {
    const { userId, items } = job.data;
    await this.inventoryService.rewardItems(userId, items);
  }
} 