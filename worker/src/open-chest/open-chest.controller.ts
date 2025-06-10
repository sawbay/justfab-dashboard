import { Body, Controller, Get, Post } from '@nestjs/common';
import { OpenChestService } from './open-chest.service';

@Controller('open-chest')
export class OpenChestController {
  constructor(private readonly openChestService: OpenChestService) { }

  @Post()
  async openChest(@Body() body: { userId: string, chestId: string }) {
    try {
      const reward = await this.openChestService.openChest(body.userId, body.chestId);
      return { success: true, reward };
    } catch (error) {
      return { success: false, error: `${error}` };
    }
  }

  @Get('reward-counts')
  async getRewardCounts() {
    return this.openChestService.getRewardCounts();
  }
}
