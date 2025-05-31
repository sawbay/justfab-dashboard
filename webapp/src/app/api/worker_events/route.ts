import { WORKER_URL } from "@/utils/env";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Forwards the event to the worker
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const res = await axios.post(`${WORKER_URL}/queue/fire_event`, data);
    return NextResponse.json({ ...res.data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
