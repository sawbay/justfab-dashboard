import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { BullBoardModule } from "@bull-board/nestjs";
import { ExpressAdapter } from "@bull-board/express";
import { ConfigModule } from '@nestjs/config';
import { QueueModule } from "./queue/queue.module";
import { UseModule } from './use/use.module';
import { OpenChestModule } from './open-chest/open-chest.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379'),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD
      }
    }),
    BullBoardModule.forRoot({
      route: "/queues",
      adapter: ExpressAdapter
    }),
    QueueModule,
    UseModule,
    OpenChestModule,
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {
}
