import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/database.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: User) {
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        posts: {
          create: {
            title: 'New post',
            content: 'hello world',
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
