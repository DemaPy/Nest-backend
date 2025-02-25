import { Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { responseObject } from 'src/utils/responseInterface';

@Controller('stripe')
export class StripeController {

    constructor(private readonly stripeService: StripeService) {}

    @Post('resume')
    async getResume() {
        try {
            return responseObject({ data: await this.stripeService.downloadResume() })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

}
