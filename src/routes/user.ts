import { Router } from "express";
import { container } from "tsyringe";

import { CreateUserController } from "@/controllers/user";

const router = Router();

const createUserController = container.resolve(CreateUserController);

router.post("/signup", createUserController.handle.bind(createUserController));

export default router;
