import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { CreateUserUseCase } from "@/use-cases/user";
import { AuthenticationUserAlreadyExistsError } from "@/errors/authentication-already-exists";
import bcrypt from "bcrypt";

@injectable()
export class CreateUserController {
  constructor(
    @inject("CreateUserUseCase")
    private readonly createUser: CreateUserUseCase
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const { name, email, password, phone, birthdate } = request.body;

      const createdUser = await this.createUser.execute({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        phone,
        birthdate,
      });

      return response.status(201).json(createdUser);
    } catch (error) {
      if (error instanceof AuthenticationUserAlreadyExistsError) {
        return response.status(400).json({ message: error.message });
      }

      throw error;
    }
  }
}
