import { Router } from "express";
import { deleteAllGames, getGame, updateGame, getAllGames } from "../controllers/gameController";
import { verifyToken } from "../middleware/verifyToken";
import { Server } from "socket.io";

const router = Router();

export const gameRoutes = (io: Server) => {
    router.get("/all", verifyToken, getAllGames);
    router.get("/game/:id", verifyToken, getGame);
    router.put("/game/:id", verifyToken, (req, res) => updateGame(req, res, io));
    router.delete("/", verifyToken, deleteAllGames);
    return router;
};

export default router;
