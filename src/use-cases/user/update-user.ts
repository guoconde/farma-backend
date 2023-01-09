import { UpdateUserDto, UserDto } from "@/dtos";
import { UserNotFoundError } from "@/errors/user-not-found";
import { UserRepository } from "@/repositories";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: UserRepository
  ) {}

  async execute(userId: string, input: UpdateUserDto): Promise<UserDto> {
    const userExists = await this.userRepository.findUserById(userId);
    if (!userExists) {
      throw new UserNotFoundError();
    }

    const updatedUser = await this.userRepository.updateUser(userId, input);

    return updatedUser;
  }
}
