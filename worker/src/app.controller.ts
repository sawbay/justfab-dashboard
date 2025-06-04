import { Controller, Inject, Logger, Post } from '@nestjs/common';
import getClient from './queue/appwrite/server';
import { ConfigService } from '@nestjs/config';
import { Client, Databases, Permission, Role } from 'node-appwrite';
import { ItemType, RatioRewardType, MilestoneRewardType } from './types';

@Controller('')
export class AppController {
  private readonly logger = new Logger(AppController.name);
  private readonly client: Client;
  private readonly databases: Databases;
  private readonly DATABASE_ID: string;
  private readonly USER_COL_ID: string;
  private readonly USER_FUTUREPASS_COL_ID: string;
  private readonly INVENTORY_COL_ID: string;
  private readonly APP_STATE_COL_ID: string;

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
    this.USER_FUTUREPASS_COL_ID = this.configService.get("USER_FUTUREPASS_COL_ID");
    this.INVENTORY_COL_ID = this.configService.get("INVENTORY_COL_ID");
    this.APP_STATE_COL_ID = this.configService.get("APP_STATE_COL_ID");
  }

  @Post()
  async populateDB() {
    return await this._populateDB();
  }

  async _populateDB() {
    let errs = []

    try {
      await this.databases.create(
        this.DATABASE_ID, "db", true
      );
    } catch (error) {
      errs.push(error);
    }

    try {
      await this.populateAppState();
    } catch (error) {
      errs.push(error);
    }

    try {
      await this.populateUser();
    } catch (error) {
      errs.push(error);
    }

    try {
      await this.populateUserFuturepass();
    } catch (error) {
      errs.push(error);
    }

    try {
      await this.populateInventory();
    } catch (error) {
      errs.push(error);
    }

    return errs;
  }

  private async populateUser() {
    const collection = await this.databases.createCollection(
      this.DATABASE_ID,
      this.USER_COL_ID,
      "user",
      [
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        Permission.write(Role.any()),
        Permission.delete(Role.any()),
      ],
      true,
      true
    );

    await this.databases.createStringAttribute(
      this.DATABASE_ID,
      this.USER_COL_ID,
      "userId",
      100,
      true
    );

    await this.databases.createIntegerAttribute(
      this.DATABASE_ID,
      this.USER_COL_ID,
      "fabBalance",
      true,
      0
    );

    await this.databases.createIntegerAttribute(
      this.DATABASE_ID,
      this.USER_COL_ID,
      "rootBalance",
      true,
      0
    );
  }

  private async populateAppState() {
    const collection = await this.databases.createCollection(
      this.DATABASE_ID,
      this.APP_STATE_COL_ID,
      "app_state",
      [
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        Permission.write(Role.any()),
        Permission.delete(Role.any()),
      ],
      true,
      true
    );

    await this.databases.createStringAttribute(
      this.DATABASE_ID,
      this.APP_STATE_COL_ID,
      "stateValue",
      5000,
      true
    );

    await this.databases.createDocument(
      this.DATABASE_ID,
      this.APP_STATE_COL_ID,
      "TOTAL_CHESTS_OPENED",
      {
        stateValue: "0"
      }
    );

    await this.databases.createDocument(
      this.DATABASE_ID,
      this.APP_STATE_COL_ID,
      "REWARD_COUNTS",
      {
        stateValue: "{}"
      }
    );
  }

  private async populateUserFuturepass() {
    const collection = await this.databases.createCollection(
      this.DATABASE_ID,
      this.USER_FUTUREPASS_COL_ID,
      "user_futurepass",
      [
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        Permission.write(Role.any()),
        Permission.delete(Role.any()),
      ],
      true,
      true
    );

    await this.databases.createStringAttribute(
      this.DATABASE_ID,
      this.USER_FUTUREPASS_COL_ID,
      "userId",
      100,
      true
    );

    await this.databases.createStringAttribute(
      this.DATABASE_ID,
      this.USER_FUTUREPASS_COL_ID,
      "futurepass",
      100,
      true
    );
  }

  private async populateInventory() {
    const collection = await this.databases.createCollection(
      this.DATABASE_ID,
      this.INVENTORY_COL_ID,
      "inventory",
      [
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        Permission.write(Role.any()),
        Permission.delete(Role.any()),
      ],
      true,
      true
    );

    await this.databases.createStringAttribute(
      this.DATABASE_ID,
      this.INVENTORY_COL_ID,
      "userId",
      100,
      true
    );

    await this.databases.createStringAttribute(
      this.DATABASE_ID,
      this.INVENTORY_COL_ID,
      "originId",
      100,
      false
    );

    await this.databases.createEnumAttribute(
      this.DATABASE_ID,
      this.INVENTORY_COL_ID,
      "itemType",
      [
        ItemType.CHEST,
        ItemType.AURA_KEY,

        RatioRewardType.ROOT_1,
        RatioRewardType.ROOT_10,
        RatioRewardType.ROOT_50,
        RatioRewardType.FAB_1,
        RatioRewardType.FAB_10,
        RatioRewardType.FAB_50,
        RatioRewardType.FAB_100,
        RatioRewardType.GOLD_BAG,
        RatioRewardType.FOOD_BAG,
        RatioRewardType.ENERGY_BAG,

        MilestoneRewardType.ROOT_70,
        MilestoneRewardType.ROOT_100,
        MilestoneRewardType.ROOT_500,
        MilestoneRewardType.ROOT_1000,
        MilestoneRewardType.CHEST_2,
        MilestoneRewardType.KEY_1,
        MilestoneRewardType.KEYS_2,
        MilestoneRewardType.KEYS_3,
      ],
      true
    );

    await this.databases.createBooleanAttribute(
      this.DATABASE_ID,
      this.INVENTORY_COL_ID,
      "used",
      true
    );
  }
}   
