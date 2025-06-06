import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { BullBoardModule } from "@bull-board/nestjs";
import { ExpressAdapter } from "@bull-board/express";
import { ConfigModule } from '@nestjs/config';
import { InventoryModule } from "./inventory/inventory.module";

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
    InventoryModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
