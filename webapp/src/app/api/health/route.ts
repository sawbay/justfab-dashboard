import { worker } from "@/utils/worker";
import { NextResponse } from "next/server";

export async function GET() {
  let isWorkerHealthy = false;
  try {
    const data = await worker.health();
    isWorkerHealthy = data.data.isWorkerHealthy;
  } catch (error) {
    isWorkerHealthy = false;
  }

  return NextResponse.json({ isWebappHealthy: true, isWorkerHealthy });
}
