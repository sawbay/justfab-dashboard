import { Controller, Post, Body, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { WELCOME_CHEST_QUEUE } from './queues/welcome-chest.processor';
import { WorkerEvent, WorkerEventType } from './queue';

@Controller('queue')
export class QueueController {
  private readonly logger: Logger;

  constructor(
    @InjectQueue(WELCOME_CHEST_QUEUE) private readonly welcomeChestQueue: Queue
  ) {
    this.logger = new Logger(QueueController.name);
  }

  @Post('enqueue')
  async enqueue(
    @Body() body: { event: WorkerEvent }
  ) {
    const { event } = body;
    try {
      await this.routeEvent(event);
      this.logger.log(`Enqueued event: ${JSON.stringify(event)}`);
      return { success: true };
    } catch (error) {
      this.logger.error(`Failed to enqueue  event: ${JSON.stringify(event)}: ${error.message}`, error.stack);
      return { success: false, error: error };
    }
  }

  async routeEvent(event: WorkerEvent) {
    switch (event.etype) {
      case WorkerEventType.REWARD_WELCOME_CHEST:
        await this.welcomeChestQueue.add(WELCOME_CHEST_QUEUE, event.payload);
        break;
      default:
        this.logger.error(`Unknown event type: ${event.etype}`);
        break;
    }
  }
}