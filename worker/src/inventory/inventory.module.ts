import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { INVENTORY_QUEUE, InventoryProcessor } from './inventory.processor';
import { InventoryService } from './inventory.service';
import { InventoryEnqueueController } from './enqueue.controller';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardController } from './bullboard.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: INVENTORY_QUEUE
    }),
    BullBoardModule.forFeature({
      name: INVENTORY_QUEUE,
      adapter: BullMQAdapter
    }),
  ],
  providers: [InventoryProcessor, InventoryService],
  exports: [InventoryService],
  controllers: [BullBoardController, InventoryEnqueueController],
})
export class InventoryModule { } 