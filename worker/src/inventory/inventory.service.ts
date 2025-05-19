import { Injectable, Logger } from '@nestjs/common';
import prisma from '../../../prisma/prisma';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

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