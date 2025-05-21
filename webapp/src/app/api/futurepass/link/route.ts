import { NextRequest, NextResponse } from "next/server";
import { linkFuturepass } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from '@/utils/prisma';
import { InventoryItemId } from '@/types';

export async function POST(req: NextRequest) {
  // Get the authenticated session
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { telegramId, futurepass } = await req.json();

  if (!telegramId || !futurepass) {
    return NextResponse.json({ error: "Missing telegramId or walletAddress" }, { status: 400 });
  }

  // Verify that the authenticated user is linking their own Telegram ID
  if (Number(session.user.id) !== Number(telegramId)) {
    return NextResponse.json({ error: "Unauthorized: Cannot link other user's Telegram account" }, { status: 403 });
  }

  try {
    const user = await linkFuturepass(telegramId, futurepass);

    // Check if user already has a welcome chest
    const welcomeChest = await prisma.inventoryItem.findFirst({
      where: {
        userId: user.id,
        inventoryMetadataId: InventoryItemId.WELCOME_CHEST,
      },
    });

    if (!welcomeChest) {
      // Reward both key and welcome chest
      await prisma.inventoryItem.createMany({
        data: [
          {
            userId: user.id,
            inventoryMetadataId: InventoryItemId.WELCOME_CHEST,
          },
          {
            userId: user.id,
            inventoryMetadataId: InventoryItemId.KEY,
          },
        ],
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}