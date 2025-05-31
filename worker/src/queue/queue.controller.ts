import { Controller, Post, Body, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { WELCOME_CHEST_QUEUE } from './queues/welcome-chest.processor';
import { WorkerEvent } from './queue';

@Controller('queue')
export class QueueController {
  private readonly logger: Logger;

  constructor(
    @InjectQueue(WELCOME_CHEST_QUEUE) private readonly welcomeChestQueue: Queue
  ) {
    this.logger = new Logger(QueueController.name);
  }

  @Post('fire_event')
  async enqueueRewardWelcomeChest(
    @Body() body: { event: WorkerEvent }
  ) {
    const { event } = body;
    const jobName = `${WELCOME_CHEST_QUEUE}_${typeof event.etype}`;
    try {
      await this.welcomeChestQueue.add(jobName, { event });
      this.logger.log(`Successfully enqueued job '${jobName}' with event: ${JSON.stringify(event)}`);
      return { success: true };
    } catch (error) {
      this.logger.error(`Failed to enqueue job '${jobName}': ${error.message}`, error.stack);
      return { success: false, error: error };
    }
  }
} 