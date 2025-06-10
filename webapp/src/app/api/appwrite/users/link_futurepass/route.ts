import getClient from '@/utils/appwrite/server';
import { DATABASE_ID, USER_COL_ID } from '@/utils/env';
import { NextResponse } from 'next/server';
import { Databases } from 'node-appwrite';

export async function POST(request: Request) {
  const userId = await request.headers.get('x-appwrite-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }
  const { futurepass } = await request.json();

  const client = await getClient();
  try {
    const databases = new Databases(client);

    await databases.updateDocument(
      DATABASE_ID,
      USER_COL_ID,
      userId,
      {
        futurepass,
      },
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }
}
