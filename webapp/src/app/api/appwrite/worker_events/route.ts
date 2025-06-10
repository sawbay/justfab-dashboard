import { WORKER_URL } from "@/utils/env";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const userId = await req.headers.get('x-appwrite-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  const data = await req.json();
  try {
    const res = await axios.post(`${WORKER_URL}/queue/enqueue`, {
      userId,
      data,
    });
    return NextResponse.json({ ...res.data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
