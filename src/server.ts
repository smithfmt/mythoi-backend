import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: number;   // Example: assuming the token contains a user id
  email: string;
  // Add other fields as needed, depending on your token payload
}

// Extend the default Request type to include the `user` property
interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
}

const app = express();
const prisma = new PrismaClient();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true, 
  },
});

app.use(cors()); 
app.use(express.json());

const verifyToken = (req: AuthenticatedRequest, res: Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token format' });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Token verification failed' });
    }
    
    req.user = decoded as DecodedToken;
    next();
  });
};

app.post("/signup", async (req: Request, res: Response)  => {
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
});

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
