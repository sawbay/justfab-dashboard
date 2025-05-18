import { Module } from "@nestjs/common";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullModule } from "@nestjs/bullmq";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { FeatureController } from './feature.controller';
import { InventoryModule } from './inventory/inventory.module';

// example feature module, feature can be anything. eg. user module
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'feature_queue'
    }),

    //Register each queue using the `forFeature` method.
    BullBoardModule.forFeature({
      name: 'feature_queue',
      adapter: BullMQAdapter
    }),
    InventoryModule
  ],
  controllers: [FeatureController],
  providers: [],
})
export class FeatureModule {}