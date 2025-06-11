import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [QueueModule],
  controllers: [UsersController]
})
export class UsersModule { }
