import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignsModule } from './campaign/campaigns.module';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CampaignsModule, ConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
