import { Router } from "express";
import { container } from "tsyringe";

import { CreateUserController } from "@/controllers/user";
import { ListUsersController } from "@/controllers/user/list-users";

const router = Router();

const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);

router.post("/signup", createUserController.handle.bind(createUserController));
router.get("/users", listUsersController.handle.bind(listUsersController));

export default router;
