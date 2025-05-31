import client from "@/utils/appwrite/server";
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
  const user = await validator.validate(data);

  if (user.id && user.first_name) {
    const userId = user.id.toString();
    const users = new Users(client);
    let systemUser = await users.get(userId);
    if (!systemUser) {
      systemUser = await users.create(
        user.id.toString(),
        undefined,
        undefined,
        user.username
      );
    }

    const sessions = await users.listSessions(userId);
    if (sessions.total == 0) {
      await users.createSession(userId);
    }

    const jwt = await users.createJWT(userId);
    return NextResponse.json({
      success: true, data: {
        id: systemUser.$id,
        jwt: jwt.jwt,
        name: systemUser.name,
        email: systemUser.email
      }
    });
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}