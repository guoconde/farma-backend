import { inject, injectable } from "tsyringe";

import bcrypt from "bcrypt";
import { UserRepository } from "@/repositories";
import { AuthDto } from "@/dtos";
import { InvalidCredentials } from "@/errors/invalid-credentials";

@injectable()
export class UserAuthUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: UserRepository
  ) {}

  async execute(input: AuthDto) {
    const userExists = await this.userRepository.findUserByEmail(input.email);

    if (!userExists) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = bcrypt.compareSync(
      input.password,
      userExists.password
    );

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    return true;
  }
}
