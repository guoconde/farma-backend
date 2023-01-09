import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { DeleteUserUseCase } from "@/use-cases/user";
import { UserNotFoundError } from "@/errors/user-not-found";

@injectable()
export class DeleteUserController {
  constructor(
    @inject("DeleteUserUseCase")
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const { userId } = request.params;

      await this.deleteUserUseCase.execute(userId);

      response.status(204).send();
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return response.status(400).json({ message: error.message });
      }

      throw error;
    }
  }
}
