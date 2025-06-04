import { Module } from '@nestjs/common';
import { OpenChestService } from './open-chest.service';
import { OpenChestController } from './open-chest.controller';

@Module({
  providers: [OpenChestService],
  controllers: [OpenChestController]
})
export class OpenChestModule {}
