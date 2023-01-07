import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { ListUsersUseCase } from "@/use-cases/user";

@injectable()
export class ListUsersController {
  constructor(
    @inject("ListUsersUseCase")
    private readonly listUsers: ListUsersUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { name = "", page = 1, limit = 50 } = request.body;

    const userPagination = await this.listUsers.execute({
      limit: Number(limit),
      page: Number(page),
      name: String(name),
    });

    response.status(200).json(userPagination);
  }
}
