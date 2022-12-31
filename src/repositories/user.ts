import { injectable } from "tsyringe";

import { prisma } from "@/database/prismaClient";
import { CreateUserDto } from "@/dtos";

@injectable()
export class UserRepository {
  async create(input: CreateUserDto) {
    const createdUser = await prisma.user.create({
      data: {
        ...input,
      },
    });

    return createdUser;
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
