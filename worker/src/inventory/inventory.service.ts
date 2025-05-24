import { Injectable, Logger } from '@nestjs/common';
import prisma from '../../../webapp/prisma/prisma';
import { WELCOME_CHEST_ITEM_TYPE, KEY_ITEM_TYPE } from '../../../prisma/types';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  async rewardWelcomeChest(userId: string) {
    // Implement welcome chest reward
    // every user should get a welcome chest once
    // if they have already received the welcome chest, do not reward again
    // else, reward the welcome chest and key

    const welcomeChestMeta = await prisma.inventoryMetadata.findFirst({
      where: { type: WELCOME_CHEST_ITEM_TYPE },
    });
    if (!welcomeChestMeta) {
      this.logger.warn('No InventoryMetadata found for welcome_chest');
      return;
    }
    const hasWelcomeChest = await prisma.inventoryItem.findFirst({
      where: {
        userId,
        inventoryMetadataId: welcomeChestMeta.id,
      },
    });
    if (hasWelcomeChest) {
      this.logger.log(`User ${userId} already has a welcome chest`);
      return;
    }

    const keyMeta = await prisma.inventoryMetadata.findFirst({
      where: { type: KEY_ITEM_TYPE },
    });
    if (!keyMeta) {
      this.logger.warn('No InventoryMetadata found for key');
      return;
    }

    // Reward both welcome chest and key
    await prisma.inventoryItem.createMany({
      data: [
        { userId, inventoryMetadataId: welcomeChestMeta.id },
        { userId, inventoryMetadataId: keyMeta.id },
      ],
    });
    this.logger.log(`Rewarded welcome chest and key to user ${userId}`);
  }

  async rewardItems(userId: string, items: string[]) {
    this.logger.log(`Rewarding items ${items} to user ${userId}`);
    for (const itemName of items) {
      // Find InventoryMetadata by name
      const metadata = await prisma.inventoryMetadata.findFirst({
        where: { name: itemName },
      });
      if (!metadata) {
        this.logger.warn(`No InventoryMetadata found for item: ${itemName}`);
        continue;
      }
      // Check if user already has this item
      const existing = await prisma.inventoryItem.findFirst({
        where: {
          userId,
          inventoryMetadataId: metadata.id,
        },
      });
      if (existing) {
        this.logger.log(`User ${userId} already has item ${itemName}`);
        continue;
      }
      // Create the inventory item
      await prisma.inventoryItem.create({
        data: {
          userId,
          inventoryMetadataId: metadata.id,
        },
      });
      this.logger.log(`Rewarded item ${itemName} to user ${userId}`);
    }
  }
}