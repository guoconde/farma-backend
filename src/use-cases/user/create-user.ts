import { inject, injectable } from "tsyringe";

import { UserRepository } from "@/repositories";
import { CreateUserDto, UserDto } from "@/dtos";
import { AuthenticationUserAlreadyExistsError } from "@/errors/authentication-already-exists";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: UserRepository
  ) {}

  async execute(input: CreateUserDto): Promise<UserDto> {
    const userExists = await this.userRepository.findUserByEmail(input.email);
    if (userExists) {
      throw new AuthenticationUserAlreadyExistsError();
    }

    const createdUser = await this.userRepository.create({
      name: input.name,
      email: input.email,
      password: input.password,
      phone: input.phone,
      birthdate: new Date(input.birthdate),
    });

    return createdUser;
  }
}
