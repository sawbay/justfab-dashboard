import { PrismaClient } from "@/app/generated/prisma";
import { TelegramUserData } from "@telegram-auth/server";

const globalForPrisma = global as unknown as {
	prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

export async function createUserOrUpdate(user: TelegramUserData) {
	return prisma.user.upsert({
		where: {
			id: user.id.toString(),
		},
		create: {
			id: user.id.toString(),
			name: user.first_name,
			image: user.photo_url,
		},
		update: {
			name: user.first_name,
			image: user.photo_url,
		},
	});
}
