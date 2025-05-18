import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  constructor(private readonly prisma: PrismaService) {}

  async rewardItem(userId: string, itemId: string): Promise<void> {
    this.logger.debug(`Rewarding item ${itemId} to user ${userId}`);

    try {
      // Check if user already has the item
      const existingItem = await this.prisma.inventoryItem.findFirst({
        where: {
          userId,
          itemId,
        },
      });

      if (existingItem) {
        this.logger.debug(`User ${userId} already has item ${itemId}`);
        return;
      }

      // Create the inventory item
      await this.prisma.inventoryItem.create({
        data: {
          userId,
          itemId,
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      this.logger.debug(`Successfully rewarded item ${itemId} to user ${userId}`);
    } catch (error) {
      this.logger.error(
        `Failed to reward item ${itemId} to user ${userId}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
} 