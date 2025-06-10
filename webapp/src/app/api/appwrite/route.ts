import { ItemType, MilestoneRewardType, RatioRewardType } from "@/types/item_types";
import getClient from "@/utils/appwrite/server";
import { DATABASE_ID, INVENTORY_COL_ID, USER_COL_ID } from "@/utils/env";
import { NextRequest, NextResponse } from "next/server";
import { Databases, ID, Permission, Role } from "node-appwrite";

export async function POST(req: NextRequest) {
  const client = await getClient();
  const databases = new Databases(client);

  let errs = []

  try {
    await databases.create(
      DATABASE_ID, "db", true
    );
  } catch (error) {
    errs.push(error);
  }

  try {
    const collection = await databases.createCollection(
      DATABASE_ID,
      USER_COL_ID,
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

    await databases.createStringAttribute(
      DATABASE_ID,
      USER_COL_ID,
      "futurepass",
      100,
      false
    );

    await databases.createIntegerAttribute(
      DATABASE_ID,
      USER_COL_ID,
      "level",
      true,
      0,
      undefined,
    );

    await databases.createIntegerAttribute(
      DATABASE_ID,
      USER_COL_ID,
      "fabBalance",
      true,
      0,
      undefined,
    );

    await databases.createIntegerAttribute(
      DATABASE_ID,
      USER_COL_ID,
      "rootBalance",
      true,
      0,
      undefined,
      0
    );

  } catch (error) {
    errs.push(error);
  }

  try {
    const collection = await databases.createCollection(
      DATABASE_ID,
      INVENTORY_COL_ID,
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

    await databases.createStringAttribute(
      DATABASE_ID,
      INVENTORY_COL_ID,
      "userId",
      100,
      true
    );

    await databases.createStringAttribute(
      DATABASE_ID,
      INVENTORY_COL_ID,
      "originId",
      100,
      false
    );

    await databases.createEnumAttribute(
      DATABASE_ID,
      INVENTORY_COL_ID,
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

    await databases.createBooleanAttribute(
      DATABASE_ID,
      INVENTORY_COL_ID,
      "used",
      true
    );
  } catch (error) {
    errs.push(error);
  }

  if (errs.length > 0) {
    return NextResponse.json({
      success: false,
      errors: errs,
    });
  } else {
    return NextResponse.json({
      success: true,
    });
  }
}