import { injectable } from "tsyringe";

import { prisma } from "@/database/prismaClient";
import {
  CreateUserDto,
  ListUsersDto,
  UserDto,
  UserWithoutPasswordDto,
} from "@/dtos";

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

  async count(name?: string): Promise<number> {
    return await prisma.user.count({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findAll(input: ListUsersDto): Promise<UserWithoutPasswordDto[]> {
    const page = input.page!;
    const skip = (page - 1) * input.limit!;

    const orderByDirection = input.orderBy?.direction || "asc";

    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: input.name,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        birthdate: true,
        typeOfUser: true,
        password: false,
      },
      skip,
      take: input.limit!,
      orderBy: {
        name: orderByDirection,
      },
    });

    return users;
  }
}
