import { DynamicModule, Module } from "@nestjs/common";
import { StripeController } from "./stripe.controller";
import { StripeService } from "./stripe.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  controllers: [],
  providers: [],
})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeController],
      imports: [ConfigModule.forRoot()],
      providers: [
        StripeService,
        {
          provide: "STRIPE_API_KEY",
          useFactory: async (configService: ConfigService) =>
            configService.get("STRIPE_API_KEY"),
          inject: [ConfigService],
        },
      ],
    };
  }
}
