import { UserRepository } from "@/repositories";
import { inject, injectable } from "tsyringe";

import { UserNotFoundError } from "@/errors/user-not-found";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: UserRepository
  ) {}

  async execute(userId: string): Promise<void> {
    const userExists = await this.userRepository.findUserById(userId);
    if (!userExists) {
      throw new UserNotFoundError();
    }

    await this.userRepository.deleteUser(userId);
  }
}
