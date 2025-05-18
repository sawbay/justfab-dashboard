import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { InventoryProcessor } from './inventory.processor';
import { InventoryService } from './inventory.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'events',
    }),
  ],
  providers: [InventoryProcessor, InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {} 