import { Router } from "express";
import { deleteAllGames, getGame, updateGame } from "../controllers/gameController";
import { verifyToken } from "../middleware/verifyToken";
import { Server } from "socket.io";

const router = Router();

export const gameRoutes = (io: Server) => {
    router.get("/game/:id", verifyToken, getGame);
    router.put("/game/:id", verifyToken, updateGame);
    router.delete("/", verifyToken, deleteAllGames);
    return router;
};

export default router;
