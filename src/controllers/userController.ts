// src/controllers/userController.ts
import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable must be defined");
}

export const signupUser = async (req: Request, res: Response, io: Server) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const users = await prisma.user.findMany();
    const userNames = users.map((user) => user.name);
    io.emit("userListUpdate", userNames);

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "24h" } 
    );

    return res.status(201).json({
      message: "User created and logged in",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint failed")) {
        return res.status(400).json({ message: "Email already exists" });
      }
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  const { user } = req.body;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User profile retrieved", profile });
  } catch (error) {
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};
