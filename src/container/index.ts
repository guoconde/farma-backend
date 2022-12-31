import { container } from "tsyringe";

import { UserRepository } from "@/repositories";
import { CreateUserUseCase } from "@/use-cases/user";
import { UserAuthUseCase } from "@/use-cases/auth/auth-user";

container.registerSingleton<UserRepository>("UserRepository", UserRepository);

container.registerSingleton<CreateUserUseCase>(
  "CreateUserUseCase",
  CreateUserUseCase
);

container.registerSingleton<UserAuthUseCase>(
  "UserAuthUseCase",
  UserAuthUseCase
);
