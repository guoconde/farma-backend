import { inject, injectable } from "tsyringe";

import { UserRepository } from "@/repositories";
import { ListUsersDto, PaginationDto, UserDto } from "@/dtos";
import { makePagination } from "@/helper/make-pagination";

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: UserRepository
  ) {}

  async execute(input: ListUsersDto): Promise<PaginationDto<UserDto>> {
    const totalUsers = await this.userRepository.count(input.name);
    const users = await this.userRepository.findAll(input);

    return makePagination({
      currentPage: input.page!,
      items: users,
      limit: input.limit!,
      total: totalUsers,
    });
  }
}
