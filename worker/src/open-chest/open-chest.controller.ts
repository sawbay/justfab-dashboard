import { Body, Controller, Post } from '@nestjs/common';
import { OpenChestService } from './open-chest.service';

@Controller('open-chest')
export class OpenChestController {
  constructor(private readonly openChestService: OpenChestService) { }

  @Post()
  async openChest(@Body() body: { userId: string, chestId: string }) {
    const { chestId, keyId } = await this.openChestService.checkChestAndKey(body.userId, body.chestId);
    const reward = await this.openChestService.openChest(body.userId, chestId, keyId);
    return { reward };
  }
}
