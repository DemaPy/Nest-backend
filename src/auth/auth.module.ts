import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailModule } from 'src/mail/mail.module';
import { PrismaModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MailModule, PrismaModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
