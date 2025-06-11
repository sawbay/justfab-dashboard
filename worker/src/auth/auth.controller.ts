import { Body, Controller, Inject, InternalServerErrorException, Post, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { objectToAuthDataMap, AuthDataValidator, TelegramUserData } from "@telegram-auth/server";
import { Client, Databases, Users } from 'node-appwrite';
import getClient from 'src/queue/appwrite/server';

@Controller('auth')
export class AuthController {
  private readonly client: Client;
  private readonly BOT_TOKEN: string;
  private readonly DATABASE_ID: string;
  private readonly USER_COL_ID: string;

  constructor(
    @Inject() private readonly configService: ConfigService,
  ) {
    this.client = getClient(
      this.configService.get("APPWRITE_PROJECT_ID"),
      this.configService.get("APPWRITE_ENDPOINT"),
      this.configService.get("APPWRITE_KEY")
    );
    this.BOT_TOKEN = this.configService.get("BOT_TOKEN");
    this.DATABASE_ID = this.configService.get("DATABASE_ID");
    this.USER_COL_ID = this.configService.get("USER_COL_ID");
  }
  @Post('')
  async auth(@Body() body: any) {
    let { data } = body;
    data = objectToAuthDataMap(data);
    const validator = new AuthDataValidator({
      botToken: this.BOT_TOKEN,
    });

    let telegramUser: TelegramUserData;
    try {
      telegramUser = await validator.validate(data);
    } catch (error) {
      throw new UnauthorizedException("Unauthorized");
    }

    const users = new Users(this.client);

    const userId = telegramUser.id.toString();
    let systemUser;
    try {
      systemUser = await users.get(userId);
    } catch (error: any) {
      if (error.code == 404) {
        systemUser = await users.create(
          userId,
          undefined,
          undefined,
          undefined,
          telegramUser.username ?? telegramUser.first_name,
        );
        await users.updateEmailVerification(userId, true);
        const databases = new Databases(this.client);
        await databases.createDocument(
          this.DATABASE_ID,
          this.USER_COL_ID,
          userId,
          {
            level: 0,
            fabBalance: 0,
            rootBalance: 0,
          },
        );
      } else {
        throw new InternalServerErrorException(error);
      }
    }

    const secret = await users.createToken(userId);

    return {
      success: true, data: {
        userId: systemUser.$id,
        secret: secret.secret,
      }
    };
  }
}
