import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { responseObject } from 'src/utils/responseInterface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login() {
        return responseObject({ data: { accessToken: "mysecrettoken" }})
    }
}
