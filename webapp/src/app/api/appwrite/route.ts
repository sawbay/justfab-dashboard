import getClient from "@/utils/appwrite/server";
import { NextRequest, NextResponse } from "next/server";
import { Databases, ID, Permission, Role } from "node-appwrite";

export async function POST(req: NextRequest) {
  const client = await getClient();
  const databases = new Databases(client);

  const dbId = ID.unique();

  await databases.create(
    dbId, "adb", true
  );

  const collection = await databases.createCollection(
    "683ae0e700022ecb0670",
    ID.unique(),
    "adb",
    [
      Permission.read(Role.any()),
      Permission.update(Role.any()),
      Permission.write(Role.any()),
      Permission.delete(Role.any()),
    ],
    true,
    true
  );

  return NextResponse.json({
    success: true,
    collection
  });
}