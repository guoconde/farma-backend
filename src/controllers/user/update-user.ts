import { inject, injectable } from "tsyringe";
import { Response, Request } from "express";
import { UpdateUserUseCase } from "@/use-cases/user";
import { UserNotFoundError } from "@/errors/user-not-found";

@injectable()
export class UpdateUserController {
  constructor(
    @inject("UpdateUserUseCase")
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const userId = request.params.userId;
      const { name, email, birthdate, phone, typeOfUser } = request.body;

      const updatedUser = await this.updateUserUseCase.execute(userId, {
        name,
        email,
        birthdate: new Date(birthdate),
        phone,
        typeOfUser,
      });

      return response.status(201).json(updatedUser);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return response.status(400).json({ message: error.message });
      }

      throw error;
    }
  }
}
