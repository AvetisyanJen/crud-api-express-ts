import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

const SALT_ROUNDS = 10;

export const hashPasswordMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.body.password) {
    try {
      req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
      next();
    } catch (error) {
      res.status(500).json({ message: "Error hashing password" });
    }
  } else {
    next();
  }
};
