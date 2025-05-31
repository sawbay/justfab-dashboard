import { Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { WorkerHost } from '@nestjs/bullmq';
import { Client, Databases } from 'node-appwrite';

export const WELCOME_CHEST_QUEUE = 'welcome_chest_queue';

@Processor(WELCOME_CHEST_QUEUE)
@Injectable()
export class WelcomeChestProcessor extends WorkerHost {
  private readonly client: Client;
  constructor() {
    super();
    this.client = new Client()
      .setEndpoint("https://fra.cloud.appwrite.io/v1")
      .setProject("6836b47300371c4062a3")
      .setKey("standard_feb203cc89624b58f97534f1e31637d2c953c9aae3fde8c40ce683640778245154a6260347b0f956a3bf8dcf1d30f7b2f78580fca65d3fb72baa070244bae7146cfb8e06fe4ac3c56ea2421930d149f03d58ca51b737a9abb480f155997f025993cfd36811e43caa68531b78701c6969ebd48e09b217ad85d0fbce880dfcd65d");
  }

  async process(job: Job) {
    // const { userId, items } = job.data;
    // await this.inventoryService.rewardItems(userId, items);
    const databases = new Databases(this.client);
    databases.listDocuments
  }
}