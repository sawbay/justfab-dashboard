import { NextRequest, NextResponse } from "next/server";
import { linkFuturepass } from "@/utils/prisma";

export async function POST(req: NextRequest) {
  const { telegramId, futurepass } = await req.json();

  if (!telegramId || !futurepass) {
    return NextResponse.json({ error: "Missing telegramId or walletAddress" }, { status: 400 });
  }

  try {
    const user = await linkFuturepass(telegramId, futurepass);

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: "User not found or DB error" }, { status: 500 });
  }
}