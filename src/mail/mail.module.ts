import { Module } from '@nestjs/common';
import { MailServcie } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      defaults: {
        from: process.env.MAIL_FROM,
      },
      transport: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
  ],
  providers: [MailServcie],
  exports: [MailServcie],
})
export class MailModule {}