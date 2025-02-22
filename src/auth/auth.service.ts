import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { randomBytes } from "crypto";
import { PrismaService } from "src/database/database.service";
import { MailServcie } from "src/mail/mail.service";
import { RegisterDTO } from "src/utils/lib/dto/auth";
import * as bcryptjs from "bcryptjs";
import { UserService } from "src/user/user.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
  constructor(
    private readonly mailService: MailServcie,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) {}

  async login() {
    return {
      accessToken: "mysecrettoken",
    };
  }

  private hash(password: RegisterDTO["password"]) {
    return bcryptjs.hash(password, 10);
  }

  async register(registerDTO: RegisterDTO) {
    const hashedPassword = await this.hash(registerDTO.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: registerDTO.email,
          secrets: {
            create: { password: hashedPassword },
          },
        },
      });

      this.sendVerificationEmail(registerDTO.email);

      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new BadRequestException("User already exist");
      }

      throw new InternalServerErrorException();
    }
  }

  generateToken(tokenType: "verification") {
    if (tokenType === "verification") {
      return randomBytes(32).toString("base64url");
    }
  }

  async sendVerificationEmail(email: string) {
    try {
      const token = this.generateToken("verification");

      await this.userService.updateByEmail(email, {
        secrets: {
          update: { verificationToken: token },
        },
      });

      const verificationUrl = `http://localhost:5173/auth/verify-email?token=${token}`;

      this.mailService.sendEmail({
        to: email,
        subject: `Confirm Your Email: ${email}`,
        text: `Hello, please confirm email, by clicking on the link below <a href='${verificationUrl}'>Confirm</a>`,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async verifyEmail(id: string, token: string) {
    try {
      const userDB = await this.prismaService.user.findUnique({
        where: { id },
        include: {
          secrets: {
            select: {
              verificationToken: true
            }
          }
        }
      });

      const tokenDB = userDB?.secrets?.verificationToken;

      if (!tokenDB || tokenDB !== token) {
        throw new BadRequestException("Token verification invalid");
      }

      await this.prismaService.user.update({
        where: { id },
        data: {
          emailVerified: true,
          secrets: { update: { verificationToken: null } }
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new BadRequestException();
      }

      throw new InternalServerErrorException(error);
    }
  }
}
