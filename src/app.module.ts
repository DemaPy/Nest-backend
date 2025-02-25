import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { CampaignsModule } from "./campaign/campaigns.module";
import { ConfigModule } from "./config/config.module";
import { UserModule } from "./user/user.module";
import { LoggerMiddleware } from "./logger/logger.service";
import { AuthModule } from "./auth/auth.module";
import { ScheduleModule } from "@nestjs/schedule";
import { JobScanService } from "./job-scan/job-scan.service";
import { JobPortalModule } from "./job-portal/job-portal.module";
import { MailModule } from "./mail/mail.module";
import { APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";
import { StripeModule } from "./stripe/stripe.module";

const middlewareRoutes = {
  path: "users",
  method: RequestMethod.GET,
};

@Module({
  imports: [
    CampaignsModule,
    ConfigModule,
    AuthModule,
    UserModule,
    JobPortalModule,
    MailModule,
  
  
    ScheduleModule.forRoot(),
    StripeModule.forRootAsync(),
  ],
  providers: [
    JobScanService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(middlewareRoutes);
  }
}
