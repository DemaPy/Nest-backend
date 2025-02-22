import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailServcie {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(options: ISendMailOptions) {
    return this.mailerService.sendMail(options);
  }
}
