import { Mutex } from 'async-mutex';
import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ItemType, MilestoneRewardType, RatioRewardType, RewardType } from 'src/types';
import { Client, Databases, ID, Query } from 'node-appwrite';
import { ConfigService } from '@nestjs/config';
import getClient from 'src/utils/appwrite/server';

const RATIO_REWARD_CONFIG = [
  { name: RatioRewardType.ROOT_1, rate: 0.05 }, // 10
  { name: RatioRewardType.ROOT_10, rate: 0.10 }, // 20
  { name: RatioRewardType.ROOT_50, rate: 0.45 }, // 90
  { name: RatioRewardType.FAB_1, rate: 0.03 }, // 6
  { name: RatioRewardType.FAB_10, rate: 0.02 }, // 4
  { name: RatioRewardType.FAB_50, rate: 0.14 }, // 28
  { name: RatioRewardType.FAB_100, rate: 0.01 }, // 2
  { name: RatioRewardType.GOLD_BAG, rate: 0.05 }, // 10
  { name: RatioRewardType.FOOD_BAG, rate: 0.05 }, // 10
  { name: RatioRewardType.ENERGY_BAG, rate: 0.10 }, // 20
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
export class OpenChestService implements OnApplicationBootstrap {
  private readonly logger = new Logger(OpenChestService.name);
  private readonly client: Client;
  private readonly databases: Databases;
  private readonly DATABASE_ID: string;
  private readonly INVENTORY_COL_ID: string;
  private readonly USER_COL_ID: string;
  private readonly APP_STATE_COL_ID: string;

  private readonly mutex = new Mutex();
  private readonly K = 200;
  private totalChestsOpened: number = 0;
  private rewardCounts: object = {};

  constructor(
    @Inject() private readonly configService: ConfigService,
  ) {
    this.client = getClient(
      this.configService.get("APPWRITE_PROJECT_ID"),
      this.configService.get("APPWRITE_ENDPOINT"),
      this.configService.get("APPWRITE_KEY")
    );
    this.databases = new Databases(this.client);
    this.DATABASE_ID = this.configService.get("DATABASE_ID");
    this.USER_COL_ID = this.configService.get("USER_COL_ID");
    this.INVENTORY_COL_ID = this.configService.get("INVENTORY_COL_ID");
    this.APP_STATE_COL_ID = this.configService.get("APP_STATE_COL_ID");
  }

  async onApplicationBootstrap() {
    const { totalChestsOpened, rewardCounts } = await this.getRewardCounts();
    this.totalChestsOpened = totalChestsOpened;
    this.rewardCounts = rewardCounts;
    this.logger.log(`Total chests opened: ${this.totalChestsOpened}. Reward counts: `, this.rewardCounts);
  }

  async getRewardCounts() {
    let totalChestsOpened = 0;
    let rewardCounts = {};

    let result = await this.databases.listDocuments(
      this.DATABASE_ID,
      this.APP_STATE_COL_ID,
      [
        Query.equal("$id", "REWARD_COUNTS"),
        Query.limit(1)
      ]
    );
    if (result.total > 0) {
      rewardCounts = JSON.parse(result.documents[0].stateValue);
    }

    result = await this.databases.listDocuments(
      this.DATABASE_ID,
      this.APP_STATE_COL_ID,
      [
        Query.equal("$id", "TOTAL_CHESTS_OPENED"),
        Query.limit(1)
      ]
    );

    if (result.total > 0) {
      totalChestsOpened = parseInt(result.documents[0].stateValue);
    }

    return { totalChestsOpened, rewardCounts };
  }

  async openChest(userId: string, chestId: string): Promise<RewardType> {
    try {
      const { keyId } = await this.checkChestAndKey(userId, chestId);
      const reward = await this.mutex.runExclusive(async () => {
        const reward = await this.randomReward();
        await this.updateRewardState(reward);
        await this.applyReward(userId, chestId, keyId, reward);
        return reward;
      });

      return reward;
    } catch (error) {
      throw Error(`Failed to open chest, err=${error}`);
    }
  }

  private async randomReward(): Promise<RewardType> {
    const availableRewards = this.getAvailableRewards();
    if (availableRewards.length === 0) {
      throw Error("No rewards available at this time.");
    }

    const selected = availableRewards[Math.floor(Math.random() * availableRewards.length)];
    return selected;
  }

  private async updateRewardState(reward: RewardType) {
    this.totalChestsOpened += 1;
    this.rewardCounts[reward] = (this.rewardCounts[reward] || 0) + 1;

    await this.databases.updateDocument(
      this.DATABASE_ID,
      this.APP_STATE_COL_ID,
      "TOTAL_CHESTS_OPENED",
      {
        stateValue: this.totalChestsOpened.toString()
      }
    );

    await this.databases.updateDocument(
      this.DATABASE_ID,
      this.APP_STATE_COL_ID,
      "REWARD_COUNTS",
      {
        stateValue: JSON.stringify(this.rewardCounts)
      }
    );
  }

  private getAvailableRewards() {
    const available: RewardType[] = [];
    const chestCount = this.totalChestsOpened + 1;
    const base = chestCount < this.K ? this.K : chestCount;

    for (const r of RATIO_REWARD_CONFIG) {
      const maxCount = Math.floor(r.rate * base);
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

  private async checkChestAndKey(userId: string, chestId: string): Promise<{ keyId: string }> {
    const existingWelcomeChest = await this.databases.listDocuments(
      this.DATABASE_ID,
      this.INVENTORY_COL_ID,
      [
        Query.equal("$id", chestId),
        Query.equal("itemType", ItemType.CHEST),
        Query.equal("userId", userId),
        Query.equal("used", false),
        Query.limit(1)
      ]);

    if (existingWelcomeChest.total === 0) {
      throw new Error(`Invalid chestId ${chestId} for user ${userId}`);
    }

    const existingKey = await this.databases.listDocuments(
      this.DATABASE_ID,
      this.INVENTORY_COL_ID,
      [
        Query.equal("userId", userId),
        Query.equal("itemType", ItemType.AURA_KEY),
        Query.equal("used", false),
        Query.limit(1)
      ]);

    if (existingKey.total === 0) {
      throw new Error(`No available key for user ${userId}`);
    }

    return { keyId: existingKey.documents[0].$id };
  }

  private async applyReward(userId: string, chestId: string, keyId: string, reward: RewardType) {
    // mark chest as opened
    await this.databases.updateDocument(
      this.DATABASE_ID,
      this.INVENTORY_COL_ID,
      chestId,
      { used: true }
    );
    // mark key as used
    await this.databases.updateDocument(
      this.DATABASE_ID,
      this.INVENTORY_COL_ID,
      keyId,
      { used: true }
    );

    switch (reward) {
      case RatioRewardType.ROOT_1:
      case RatioRewardType.ROOT_10:
      case RatioRewardType.ROOT_50:
      case MilestoneRewardType.ROOT_70:
      case MilestoneRewardType.ROOT_100:
      case MilestoneRewardType.ROOT_500:
      case MilestoneRewardType.ROOT_1000:
        {
          const user = await this.databases.getDocument(
            this.DATABASE_ID,
            this.USER_COL_ID,
            userId
          );
          await this.databases.updateDocument(
            this.DATABASE_ID,
            this.USER_COL_ID,
            user.$id,
            { rootBalance: user.rootBalance + parseInt(reward.split(" ")[0]) }
          );
          await this.databases.createDocument(
            this.DATABASE_ID,
            this.INVENTORY_COL_ID,
            ID.unique(),
            { userId, originId: chestId, itemType: reward, used: true }
          );
        }
        break;
      case RatioRewardType.FAB_1:
      case RatioRewardType.FAB_10:
      case RatioRewardType.FAB_50:
      case RatioRewardType.FAB_100:
        {
          const user = await this.databases.getDocument(
            this.DATABASE_ID,
            this.USER_COL_ID,
            userId
          );
          await this.databases.updateDocument(
            this.DATABASE_ID,
            this.USER_COL_ID,
            user.$id,
            { fabBalance: user.fabBalance + parseInt(reward.split(" ")[0]) }
          );
          await this.databases.createDocument(
            this.DATABASE_ID,
            this.INVENTORY_COL_ID,
            ID.unique(),
            { userId, originId: chestId, itemType: reward, used: true }
          );
        }
        break;
      default:
        await this.databases.createDocument(
          this.DATABASE_ID,
          this.INVENTORY_COL_ID,
          ID.unique(),
          { userId, originId: chestId, itemType: reward, used: false }
        );
        break;
    }
    this.logger.log(`User ${userId} opened chest ${chestId} with key ${keyId} and received reward ${reward}`);
  }
}
