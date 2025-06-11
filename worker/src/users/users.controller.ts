import { Body, Controller, Headers, InternalServerErrorException, Post, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Databases } from 'node-appwrite';
import { QueueService } from 'src/queue/queue.service';
import { WorkerEventType } from 'src/queue/types';
import getClient from 'src/utils/appwrite/server';

@Controller('users')
export class UsersController {
  private readonly client: Client;
  private readonly DATABASE_ID: string;
  private readonly USER_COL_ID: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly queueService: QueueService
  ) {
    this.client = getClient(
      this.configService.get("APPWRITE_PROJECT_ID"),
      this.configService.get("APPWRITE_ENDPOINT"),
      this.configService.get("APPWRITE_KEY")
    );
    this.DATABASE_ID = this.configService.get("DATABASE_ID");
    this.USER_COL_ID = this.configService.get("USER_COL_ID");
  }

  @Post('link_futurepass')
  async linkFuturepass(
    @Headers('x-appwrite-user-id') userId: string,
    @Body() body: { futurepass: string },
  ) {
    if (!userId) {
      throw new UnauthorizedException('User ID is required');
    }
    const { futurepass } = body;

    try {
      const databases = new Databases(this.client);

      await databases.updateDocument(
        this.DATABASE_ID,
        this.USER_COL_ID,
        userId,
        {
          futurepass,
        },
      );

      await this.queueService.enqueueEvent({
        etype: WorkerEventType.REWARD_WELCOME_CHEST,
        userId,
        payload: {
          userId,
        }
      });

      return { success: true };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
