import { Router } from "express";
import { signupUser, loginUser, getUserProfile, getAllUsers } from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";
import { Server } from "socket.io";

const router = Router();

export const userRoutes = (io: Server) => {
  router.post("/signup", (req, res) => signupUser(req, res, io));
  router.post("/login", loginUser);
  router.get("/profile", verifyToken, getUserProfile);
  router.get("/all", verifyToken, getAllUsers);
  return router;
};
