import getClient from "@/utils/appwrite/server";
import { BOT_TOKEN, DATABASE_ID, USER_COL_ID } from "@/utils/env";
import { objectToAuthDataMap, AuthDataValidator, TelegramUserData } from "@telegram-auth/server";
import { NextRequest, NextResponse } from "next/server";
import { Databases, Users } from "node-appwrite";

export async function POST(req: NextRequest) {
  let { data } = await req.json();
  data = objectToAuthDataMap(data);
  const validator = new AuthDataValidator({
    botToken: BOT_TOKEN,
  });

  let telegramUser: TelegramUserData;
  try {
    telegramUser = await validator.validate(data);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await getClient();
  const users = new Users(client);

  const userId = telegramUser.id.toString();
  let systemUser;
  try {
    systemUser = await users.get(userId);
  } catch (error: any) {
    if (error.code == 404) {
      systemUser = await users.create(
        userId,
        undefined,
        undefined,
        undefined,
        telegramUser.username ?? telegramUser.first_name,
      );
      await users.updateEmailVerification(userId, true);
      const databases = new Databases(client);
      await databases.createDocument(
        DATABASE_ID,
        USER_COL_ID,
        userId,
        {
          level: 0,
          fabBalance: 0,
          rootBalance: 0,
        },
      );
    } else {
      return NextResponse.json({ error }, { status: 500 });
    }
  }

  const secret = await users.createToken(userId);

  return NextResponse.json({
    success: true, data: {
      userId: systemUser.$id,
      secret: secret.secret,
    }
  });
}