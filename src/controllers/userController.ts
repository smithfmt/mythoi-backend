import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Server } from "socket.io";

const prisma = new PrismaClient();

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

    return res.status(201).json({ message: "User created", user });
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