import { Router } from 'express';
import { createLobby, joinLobby, getAllLobbies, getLobby, deleteLobby, deleteAllLobbies, deleteStartedLobbies, startLobby } from '../controllers/lobbyController';
import { verifyToken } from "../middleware/verifyToken";
import { Server } from "socket.io";

const router = Router();

export const lobbyRoutes = (io: Server) => {
    router.post('/create', (req, res) => createLobby(req, res, io));
    router.post('/join', (req, res) => joinLobby(req, res, io));
    router.post('/start', (req, res) => startLobby(req, res, io));
    router.get('/all', getAllLobbies);
    router.get('/:id', getLobby);
    router.delete('/:id', (req, res) => deleteLobby(req, res, io));
    router.delete('/deleteAll', (req, res) => deleteAllLobbies(req, res, io));
    router.delete('/deleteStarted', (req, res) => deleteStartedLobbies(req, res, io));
    return router;
};
