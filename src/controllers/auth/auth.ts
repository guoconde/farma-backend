import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { UserAuthUseCase } from "@/use-cases/auth";
import { InvalidCredentials } from "@/errors/invalid-credentials";

@injectable()
export class UserAuthController {
  constructor(
    @inject("UserAuthUseCase")
    private readonly userAuth: UserAuthUseCase
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const authenticatedUser = await this.userAuth.execute({
        email,
        password,
      });

      return response.status(200).json(authenticatedUser);
    } catch (error) {
      if (error instanceof InvalidCredentials) {
        return response.status(401).json({ message: error.message });
      }

      throw error;
    }
  }
}
