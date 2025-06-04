import { Mutex } from 'async-mutex';
import { BeforeApplicationShutdown, Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { MilestoneRewardType, RatioRewardType, RewardType } from 'src/types';

const RATIO_REWARD_CONFIG = [
  { name: RatioRewardType.ROOT_1, rate: 0.05 },
  { name: RatioRewardType.ROOT_10, rate: 0.10 },
  { name: RatioRewardType.ROOT_50, rate: 0.45 },
  { name: RatioRewardType.FAB_1, rate: 0.03 },
  { name: RatioRewardType.FAB_10, rate: 0.02 },
  { name: RatioRewardType.FAB_50, rate: 0.14 },
  { name: RatioRewardType.FAB_100, rate: 0.01 },
  { name: RatioRewardType.GOLD_BAG, rate: 0.05 },
  { name: RatioRewardType.FOOD_BAG, rate: 0.05 },
  { name: RatioRewardType.ENERGY_BAG, rate: 0.10 },
];

const MILESTONE_REWARD_CONFIG = [
  { chest: 10, name: MilestoneRewardType.ROOT_70, amount: 2 },
  { chest: 50, name: MilestoneRewardType.ROOT_100, amount: 5 },
  { chest: 2000, name: MilestoneRewardType.ROOT_500, amount: 5 },
  { chest: 5000, name: MilestoneRewardType.ROOT_1000, amount: 20 },
  { chest: 10, name: MilestoneRewardType.CHEST_2, amount: 2 },
  { chest: 10, name: MilestoneRewardType.KEY_1, amount: 2 },
  { chest: 50, name: MilestoneRewardType.KEYS_2, amount: 2 },
  { chest: 150, name: MilestoneRewardType.KEYS_3, amount: 2 },
];

@Injectable()
export class OpenChestService implements OnApplicationBootstrap, BeforeApplicationShutdown {
  private readonly logger = new Logger(OpenChestService.name);

  private readonly mutex = new Mutex();
  private readonly K = 200;
  private totalChestsOpened: number = 0;
  private rewardCounts: object = {};

  async onApplicationBootstrap() {
    // load rewards from database
    // this.totalChestsOpened = await this.getTotalChestsOpened();
    // this.rewardCounts = await this.getRewardCounts();
  }

  async beforeApplicationShutdown() {
    // save load rewards from database
  }

  async openChest(userId: string, chestId: string, keyId: string): Promise<RewardType> {
    try {
      return await this.mutex.runExclusive(async () => {
        const rewardType = await this.randomReward();

        return await this.apply(userId, chestId, keyId, rewardType);
      });
    } catch (error) {
      throw Error(`Failed to open chest, err=${error}`);
    }
  }

  async checkChestAndKey(userId: string, chestId: string): Promise<{ chestId: string, keyId: string }> {
    // const chest = await this.getChest(userId, chestId);
    // const key = await this.getKey(userId, chestId);
    return { chestId: "CHEST01", keyId: "KEY01" };
  }

  private async randomReward(): Promise<RewardType> {
    const availableRewards = this.getAvailableRewards();
    if (availableRewards.length === 0) {
      throw Error("No rewards available at this time.");
    }

    const selected = availableRewards[Math.floor(Math.random() * availableRewards.length)];
    return selected;
  }

  private getAvailableRewards() {
    const available: RewardType[] = [];
    const base = this.totalChestsOpened < this.K ? this.K : this.totalChestsOpened;

    for (const r of RATIO_REWARD_CONFIG) {
      const maxCount = Math.floor(r.rate * 100 * base);
      const currentCount = this.rewardCounts[r.name] || 0;
      if (currentCount < maxCount) {
        available.push(r.name);
      }
    }

    for (const m of MILESTONE_REWARD_CONFIG) {
      if (this.totalChestsOpened === m.chest) {
        for (let i = 0; i < m.amount; i++) {
          available.push(m.name);
        }
      }
    }

    return available;
  }

  private async apply(userId: string, chestId: string, keyId: string, reward: RewardType): Promise<RewardType> {
    this.rewardCounts[reward] = (this.rewardCounts[reward] || 0) + 1;
    this.totalChestsOpened += 1;
    // mark chest as opened
    // mark key as used
    // create reward

    this.logger.log(`Total chests opened: ${this.totalChestsOpened}`);
    this.logger.log(this.rewardCounts);
    this.logger.log(`User ${userId} opened chest ${chestId} with key ${keyId} and received reward ${reward}`);

    return reward;
  }
}
