import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignsModule } from './campaign/campaigns.module';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './logger/logger.service';
import { AuthModule } from './auth/auth.module';

const middlewareRoutes = {
  path: 'users',
  method: RequestMethod.GET
}

@Module({
  imports: [CampaignsModule, ConfigModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(middlewareRoutes);
  }
}
