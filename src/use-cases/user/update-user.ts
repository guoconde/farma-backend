import { UpdateUserDto, UserDto } from "@/dtos";
import { UserRepository } from "@/repositories";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: UserRepository
  ) {}

  async execute(
    userId: string,
    input: UpdateUserDto
  ): Promise<UserDto | undefined> {
    const userExists = await this.userRepository.findUserById(userId);
    if (!userExists) {
      console.log("usuario na existe");
      return;
    }

    const updatedUser = await this.userRepository.updateUser(userId, input);

    return updatedUser;
  }
}
