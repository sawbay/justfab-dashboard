import { DATABASE_ID, USER_FUTUREPASS_COL_ID } from '@/utils/appwrite/const';
import getClient from '@/utils/appwrite/server';
import { NextResponse } from 'next/server';
import { Databases, Permission, Role } from 'node-appwrite';

export async function POST(request: Request) {
  const userId = await request.headers.get('x-appwrite-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 401 });
  }
  const { futurepass } = await request.json();

  const client = await getClient();
  try {
    const databases = new Databases(client);
    await databases.createDocument(
      DATABASE_ID,
      USER_FUTUREPASS_COL_ID,
      userId,
      {
        userId: userId,
        futurepass,
      },
      [
        Permission.write(Role.user(userId)),
        Permission.update(Role.user(userId)),
      ]
    );

  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }
}
