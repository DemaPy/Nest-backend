import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  ParseIntPipe,
  Query,
  ParseBoolPipe,
  HttpException,
  HttpStatus,
  Headers,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "@prisma/client";
import { responseObject } from "src/utils/responseInterface";
import { AuthGuard } from "src/auth/guard/auth.guard";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: User) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Request() req) {
    try {
      return responseObject({ data: await this.userService.findAll() });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  async findOne(@Param("id", ParseIntPipe) id: string) {
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        return new HttpException("User not found", HttpStatus.NOT_FOUND);
      }
      return responseObject({ data: user });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
