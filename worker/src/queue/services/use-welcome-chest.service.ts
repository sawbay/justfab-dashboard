import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UseWelcomeChestService {
  constructor(
    @Inject() private readonly configService: ConfigService,
  ) {
    // this.items = []
    // this.client = getClient(
    //   this.configService.get("APPWRITE_PROJECT_ID"),
    //   this.configService.get("APPWRITE_ENDPOINT"),
    //   this.configService.get("APPWRITE_KEY")
    // );
    // this.DATABASE_ID = this.configService.get("DATABASE_ID");
    // this.INVENTORY_COL_ID = this.configService.get("INVENTORY_COL_ID");
  }
}
