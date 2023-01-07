import { injectable } from "tsyringe";

import { prisma } from "@/database/prismaClient";
import { CreateUserDto, ListUsersDto, UserDto } from "@/dtos";

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

  async findAll(input: ListUsersDto): Promise<UserDto[]> {
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
      skip,
      take: input.limit!,
      orderBy: {
        name: orderByDirection,
      },
    });

    return users;
  }
}
