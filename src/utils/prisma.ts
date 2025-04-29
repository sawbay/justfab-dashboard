import { PrismaClient } from "@/app/generated/prisma";
import { TelegramUserData } from "@telegram-auth/server";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

export async function createUserOrUpdate(user: TelegramUserData) {
  let tgId = Number(user.id)
  return prisma.user.upsert({
    where: {
      tgId,
    },
    create: {
      tgId,
      name: user.first_name,
      image: user.photo_url,
    },
    update: {
      name: user.first_name,
      image: user.photo_url,
    },
  });
}

export async function linkFuturepass(tgId: number, futurepass: string) {
  return prisma.user.update({
    where: { tgId },
    data: { futurepass },
  });
}
