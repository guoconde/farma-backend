import { injectable } from "tsyringe";

import { prisma } from "@/database/prismaClient";
import {
  CreateUserDto,
  ListUsersDto,
  UpdateUserDto,
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

  async findUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
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

  async updateUser(userId: string, input: UpdateUserDto): Promise<UserDto> {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...input,
        phone: input.phone.replace(/\D/g, ""),
      },
    });

    return updatedUser;
  }
}
