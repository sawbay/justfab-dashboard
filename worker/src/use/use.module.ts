import { Module } from '@nestjs/common';
import { UseService } from './use.service';
import { UseController } from './use.controller';

@Module({
  providers: [UseService],
  controllers: [UseController]
})
export class UseModule {}
