import { Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { WorkerHost } from '@nestjs/bullmq';
import { Client, Databases, ID, Permission, Query, Role } from 'node-appwrite';
import getClient from 'src/queue/appwrite/server';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UseWelcomeChestService {
  private items: any[];
  constructor(
    @Inject() private readonly configService: ConfigService,
  ) {
    this.items = []
    this.client = getClient(
      this.configService.get("APPWRITE_PROJECT_ID"),
      this.configService.get("APPWRITE_ENDPOINT"),
      this.configService.get("APPWRITE_KEY")
    );
    this.DATABASE_ID = this.configService.get("DATABASE_ID");
    this.INVENTORY_COL_ID = this.configService.get("INVENTORY_COL_ID");
  }

  async randomReward() {

  }
}
