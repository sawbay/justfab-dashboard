import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { WELCOME_CHEST_QUEUE, WelcomeChestProcessor } from './queues/welcome-chest.processor';
// import { WelcomeChestService } from './queues/01_welcome_chest/welcome_chest.service';
import { EnqueueController } from './enqueue.controller';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    BullModule.registerQueue({ name: WELCOME_CHEST_QUEUE }),
    BullBoardModule.forFeature({
      name: WELCOME_CHEST_QUEUE,
      adapter: BullMQAdapter
    }),
  ],
  providers: [WelcomeChestProcessor],
  exports: [],
  controllers: [EnqueueController],
})
export class QueueModule { } 