import { Injectable, Logger } from '@nestjs/common';
import { WorkerEvent, WorkerEventType } from './types';
import { InjectQueue } from '@nestjs/bullmq';
import { WELCOME_CHEST_QUEUE } from './queues/welcome-chest.processor';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  private readonly logger: Logger;

  constructor(
    @InjectQueue(WELCOME_CHEST_QUEUE) private readonly welcomeChestQueue: Queue
  ) {
    this.logger = new Logger(QueueService.name);
  }

  async enqueueEvent(event: WorkerEvent) {
    switch (event.etype) {
      case WorkerEventType.REWARD_WELCOME_CHEST:
        await this.welcomeChestQueue.add(WELCOME_CHEST_QUEUE, event);
        break;
      default:
        this.logger.error(`Unknown event type: ${event.etype}`);
        break;
    }
  }
}
