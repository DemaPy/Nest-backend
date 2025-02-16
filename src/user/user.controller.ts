import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { responseObject } from 'src/utils/responseInterface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: User) {
    return this.userService.create({
      email: 'benderdema@gmail.com',
      id: 1,
      name: 'Dema',
    });
  }

  @Get()
  async findAll() {
    try {
      return responseObject({ data: await this.userService.findAll() });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
