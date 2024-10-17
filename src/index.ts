import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { userRoutes } from "./routes/userRoutes";
import { lobbyRoutes } from "./routes/lobbyRoutes";

const app = express();
const server = http.createServer(app);

// Setup Web Sockets
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

// Setup routes
app.use("/api/users", userRoutes(io));
app.use("/api/lobbies", lobbyRoutes(io));

// Socket connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});