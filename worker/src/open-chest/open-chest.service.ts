import { Mutex } from 'async-mutex';
import { BeforeApplicationShutdown, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class OpenChestService implements OnApplicationBootstrap, BeforeApplicationShutdown {
  private readonly mutex = new Mutex();
  private readonly rewardCounts: Map< = 0;

  constructor(
    @Inject() private readonly configService: ConfigService,
  ) {
    super();
  }

  async onApplicationBootstrap() {
    // load rewards from database
  }

  async beforeApplicationShutdown(signal?: string) {
    // save load rewards from database
  }

  async openChest(userId: string, chestId: string) {
    try {
      await this.mutex.runExclusive(async () => {

      });
    } catch (error) {
      throw Error(`Failed to open chest, err=${error}`);
    }
  }

  async checkChestAndKey(userId: string, chestId: string) {
    const chest = await this.getChest(userId, chestId);
    const key = await this.getKey(userId, chestId);
    return { chest, key };
  }
}
