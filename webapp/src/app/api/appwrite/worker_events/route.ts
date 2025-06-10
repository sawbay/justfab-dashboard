import { WORKER_URL } from "@/utils/env";
import { WorkerEvent } from "@/utils/worker_events";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const userId = await req.headers.get('x-appwrite-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }

  // set userId
  const { event } = await req.json();
  event.userId = userId;

  try {
    const res = await enqueueEvent(event as WorkerEvent);
    return NextResponse.json({ ...res.data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export const enqueueEvent = async (event: WorkerEvent) => {
  return await axios.post(`${WORKER_URL}/queue/enqueue`, { event });
}