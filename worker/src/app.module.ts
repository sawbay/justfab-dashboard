import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { BullBoardModule } from "@bull-board/nestjs";
import { FeatureModule } from "./feature/feature.module";
import { ExpressAdapter } from "@bull-board/express";
import { ConfigModule } from '@nestjs/config';

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
    FeatureModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
