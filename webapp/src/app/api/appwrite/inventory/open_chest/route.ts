import { NextResponse } from 'next/server';
import { worker } from "@/utils/worker";

export async function POST(request: Request) {
  const userId = await request.headers.get('x-appwrite-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }
  const { chestId } = await request.json();

  try {
    const res = await worker.openChest(userId, chestId);
    return NextResponse.json({ ...res.data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
