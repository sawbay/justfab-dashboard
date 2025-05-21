import { Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { InventoryService } from './inventory.service';
import { Injectable } from '@nestjs/common';
import { WorkerHost } from '@nestjs/bullmq';

export const INVENTORY_QUEUE = 'inventory_queue';

@Processor(INVENTORY_QUEUE)
@Injectable()
export class InventoryProcessor extends WorkerHost {
  constructor(private readonly inventoryService: InventoryService) {
    super();
  }

  async process(job: Job) {
    const { userId, items } = job.data;
    await this.inventoryService.rewardItems(userId, items);
  }
} 