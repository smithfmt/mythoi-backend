import { Server } from "socket.io";
import dotenv from "dotenv";
import { listenForUpdates } from "../db";
dotenv.config();

export const setupSocketServer = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  listenForUpdates(io);

  return io;
};
