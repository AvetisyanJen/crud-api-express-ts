import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  replaceUser,
} from "../controllers/userController";
import { hashPasswordMiddleware } from "../middlewares/hashPasswordMiddleware";

const router = Router();

router.post("/users", hashPasswordMiddleware, createUser);

router.get("/users", getUsers);

router.get("/users/:id", getUserById);

router.patch("/users/:id", hashPasswordMiddleware, updateUser);

router.put("/users/:id", hashPasswordMiddleware, replaceUser);

router.delete("/users/:id", deleteUser);

export default router;
