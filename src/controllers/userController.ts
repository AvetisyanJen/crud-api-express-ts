import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { readData, writeData } from "../services/fileService";
import { User } from "../models/user";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const users = readData().users;

    if (users.some((user: User) => user.email === email)) {
      res.status(400).json({ message: "User with this email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    users.push(newUser);
    writeData({ users });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const getUsers = (req: Request, res: Response): void => {
  try {
    const users = readData().users;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};

export const getUserById = (req: Request, res: Response): void => {
  try {
    const userId = parseInt(req.params.id);
    const user = readData().users.find((user: User) => user.id === userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email, password } = req.body;
    const users = readData().users;
    const userIndex = users.findIndex((user: User) => user.id === userId);

    if (userIndex === -1) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (password) {
      users[userIndex].password = await bcrypt.hash(password, 10);
    }
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    users[userIndex].updatedAt = new Date();

    writeData({ users });
    res.status(200).json(users[userIndex]);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const replaceUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email, password } = req.body;
    const users = readData().users;
    const userIndex = users.findIndex((user: User) => user.id === userId);

    if (userIndex === -1) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users[userIndex] = {
      id: userId,
      name,
      email,
      password: hashedPassword,
      createdAt: users[userIndex].createdAt,
    };

    writeData({ users });
    res.status(200).json(users[userIndex]);
  } catch (error) {
    res.status(500).json({ message: "Error replacing user", error });
  }
};

export const deleteUser = (req: Request, res: Response): void => {
  try {
    const userId = parseInt(req.params.id);
    let users = readData().users;

    if (!users.some((user: User) => user.id === userId)) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    users = users.filter((user: User) => user.id !== userId);
    writeData({ users });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
