import { Server } from "socket.io";
import { createAdapter } from "@socket.io/postgres-adapter";
import pg from "pg";
const { Pool } = pg;

// Create a PostgreSQL pool instance for the adapter
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const setupSocketServer = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Use the Socket.IO PostgreSQL adapter
  io.adapter(createAdapter(pool));

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Add any per-connection logic here, if needed

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  // Start listening to PostgreSQL changes (automatic through adapter)
  // No need to manually implement the LISTEN logic

  return io;
};
