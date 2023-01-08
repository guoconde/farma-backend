import { inject, injectable } from "tsyringe";
import { Response, Request } from "express";
import { UpdateUserUseCase } from "@/use-cases/user";

@injectable()
export class UpdateUserController {
  constructor(
    @inject("UpdateUserUseCase")
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  async handle(request: Request, response: Response) {
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
  }
}
