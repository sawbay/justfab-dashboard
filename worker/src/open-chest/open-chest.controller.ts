import { Body, Controller, Get, Headers, InternalServerErrorException, Logger, Post, UnauthorizedException } from '@nestjs/common';
import { OpenChestService } from './open-chest.service';

@Controller('open-chest')
export class OpenChestController {
  private readonly logger = new Logger(OpenChestController.name);
  constructor(private readonly openChestService: OpenChestService) { }

  @Post()
  async openChest(
    @Headers('x-appwrite-user-id') userId: string,
    @Body() body: { userId: string, chestId: string }) {
    if (!userId) {
      throw new UnauthorizedException('User ID is required');
    }

    try {
      const reward = await this.openChestService.openChest(userId, body.chestId);
      this.logger.log(`User ${userId} opened chest ${body.chestId} and received reward ${reward}`);
      return { reward };
    } catch (error) {
      this.logger.error(error.toString());
      throw new InternalServerErrorException(error.toString());
    }
  }

  @Get('reward-counts')
  async getRewardCounts() {
    return this.openChestService.getRewardCounts();
  }
}
