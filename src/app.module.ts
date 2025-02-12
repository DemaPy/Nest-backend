import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignsModule } from './campaigns/campaigns.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [CampaignsModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
