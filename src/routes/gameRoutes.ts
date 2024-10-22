import { Router } from "express";
import { getGame } from "../controllers/gameController";
import { verifyToken } from "../middleware/verifyToken";
import { Server } from "socket.io";

const router = Router();

export const gameRoutes = (io: Server) => {
    router.get("/game/:id", verifyToken, getGame);
    return router;
};

export default router;
