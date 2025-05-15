import { NextRequest, NextResponse } from "next/server";
import { getUserByTgId, linkFuturepass } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";


export async function GET(req: NextRequest) {
  // Get the authenticated session
  const session = await getServerSession(authOptions);

  const tgId = await req.nextUrl.searchParams.get("tgId");
  if (!session || !session.user?.id || tgId !== session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const tgIdNumber = Number(tgId);
    const user = await getUserByTgId(tgIdNumber);

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}