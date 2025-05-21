import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

// GET /api/inventory?userId=...&type=...&rarity=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const type = searchParams.get('type');
  const rarity = searchParams.get('rarity');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  // Fetch inventory items for the user
  const inventoryItems = await prisma.inventoryItem.findMany({
    where: { userId },
    include: { metadata: true },
  });

  // Filter by type and rarity if provided
  const filtered = inventoryItems.filter((item) => {
    const meta = item.metadata || {};
    if (type && meta.type !== type) return false;
    if (rarity && meta.metadata?.rarity !== rarity) return false;
    return true;
  });

  // Format response
  const items = filtered.map((item) => ({
    itemId: item.id,
    name: item.metadata?.name,
    type: item.metadata?.type,
    quantity: 1, // adjust if you add quantity to InventoryItem
    rarity: item.metadata?.metadata?.rarity,
    ...item.metadata?.metadata,
  }));

  return NextResponse.json({ items });
} 