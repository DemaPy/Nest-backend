import { Module } from '@nestjs/common';
import { configSchema } from './schema';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validate: (config) => configSchema.parse(config),
    }),
  ],
})
export class ConfigModule {}
