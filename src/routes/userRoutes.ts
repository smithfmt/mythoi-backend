import { Router } from "express";
import { signupUser } from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";
import { Server } from "socket.io";

const router = Router();

export const userRoutes = (io: Server) => {
  router.post("/signup", (req, res) => signupUser(req, res, io));
  
  // Add other routes like login, profile, etc.
  
  return router;
};