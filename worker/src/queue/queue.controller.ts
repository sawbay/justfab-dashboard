import { Controller, Post, Body, Logger } from '@nestjs/common';
import { WorkerEvent } from './types';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  private readonly logger: Logger;

  constructor(
    private readonly queueService: QueueService
  ) {
    this.logger = new Logger(QueueController.name);
  }

  @Post('enqueue')
  async enqueue(
    @Body() body: { event: WorkerEvent }
  ) {
    const { event } = body;
    try {
      await this.queueService.enqueueEvent(event);
      this.logger.log(`Enqueued event: ${JSON.stringify(event)}`);
      return { success: true };
    } catch (error) {
      this.logger.error(`Failed to enqueue  event: ${JSON.stringify(event)}: ${error.message}`, error.stack);
      return { success: false, error: error };
    }
  }
}