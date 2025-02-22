import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/database/database.service";
import { Prisma, User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: User) {
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async updateByEmail(email: string, data: Prisma.UserUpdateArgs["data"]) {
    return this.prisma.user.update({ where: { email }, data });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
