import { Router } from "express";
import { container } from "tsyringe";

import { UserAuthController } from "@/controllers/auth";

const router = Router();

const userAuthController = container.resolve(UserAuthController);

router.post("/signin", userAuthController.handle.bind(userAuthController));

export default router;
