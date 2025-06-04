import { Controller } from '@nestjs/common';

@Controller('open-chest')
export class OpenChestController {
  @Post()
  async openChest(@Body() body: { chestId: string }) {
    return this.openChestService.openChest(body.chestId);
  }
}
