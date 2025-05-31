import getClient from "@/utils/appwrite/server";
import { BOT_TOKEN } from "@/utils/env";
import { objectToAuthDataMap, AuthDataValidator } from "@telegram-auth/server";
import { NextRequest, NextResponse } from "next/server";
import { Users } from "node-appwrite";

export async function POST(req: NextRequest) {
  let { data } = await req.json();
  data = objectToAuthDataMap(data);
  const validator = new AuthDataValidator({
    botToken: BOT_TOKEN,
  });

  let telegramUser;
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
        telegramUser.username ?? telegramUser.first_name
      );
    } else {
      return NextResponse.json({ error }, { status: 500 });
    }
  }

  const tempSession = await users.createSession(userId);
  const jwt = await users.createJWT(userId);

  return NextResponse.json({
    success: true, data: {
      id: systemUser.$id,
      jwt: jwt.jwt,
      tempSessionId: tempSession.$id,
      name: systemUser.name,
      email: systemUser.email
    }
  });
}