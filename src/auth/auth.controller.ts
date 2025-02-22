import {
  Body,
  Controller,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { responseObject } from "src/utils/responseInterface";
import { RegisterDTO } from "src/utils/lib/dto/auth";
import { User } from "@prisma/client";
import { AuthGuard } from "./guard/auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login() {
    return responseObject({ data: await this.authService.login() });
  }

  @Post("register")
  async register(@Body() registerDTO: RegisterDTO) {
    return responseObject({ data: await this.authService.register(registerDTO) });
  }

  @Post("verify-email")
  @UseGuards(AuthGuard)
  async verifyEmail(@Request() req, @Query("token") token: string) {
    const user = req.user as User;
    await this.authService.verifyEmail(user.id, token);

    return responseObject({
      data: { message: "Your email has been verified." }
    });
  }
}
