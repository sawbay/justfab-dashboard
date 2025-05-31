import { ItemType } from "@/types/item_types";
import { DATABASE_ID, INVENTORY_COL_ID, USER_FUTUREPASS_COL_ID } from "@/utils/appwrite/const";
import getClient from "@/utils/appwrite/server";
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
      USER_FUTUREPASS_COL_ID,
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

    await databases.createStringAttribute(
      DATABASE_ID,
      USER_FUTUREPASS_COL_ID,
      "userId",
      100,
      true
    );

    await databases.createStringAttribute(
      DATABASE_ID,
      USER_FUTUREPASS_COL_ID,
      "futurepass",
      100,
      true
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
      [ItemType.WELCOME_CHEST, ItemType.AURA_KEY],
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