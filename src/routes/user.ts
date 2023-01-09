import { Router } from "express";
import { container } from "tsyringe";

import {
  CreateUserController,
  DeleteUserController,
  ListUsersController,
  UpdateUserController,
} from "@/controllers/user";

const router = Router();

const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);
const updateUserController = container.resolve(UpdateUserController);
const deleteUserController = container.resolve(DeleteUserController);

router.post("/signup", createUserController.handle.bind(createUserController));
router.get("/users", listUsersController.handle.bind(listUsersController));
router.put(
  "/user/:userId",
  updateUserController.handle.bind(updateUserController)
);
router.delete(
  "/user/:userId",
  deleteUserController.handle.bind(deleteUserController)
);

export default router;
