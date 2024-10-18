import { Router } from 'express';
import { createLobby, joinLobby, getAllLobbies, getLobby, deleteLobby, deleteAllLobbies, deleteStartedLobbies, startLobby, leaveLobby } from '../controllers/lobbyController';
import { verifyToken } from "../middleware/verifyToken";
import { Server } from "socket.io";

const router = Router();

export const lobbyRoutes = (io: Server) => {
    router.post('/create', verifyToken, (req, res) => createLobby(req, res, io));
    router.post('/join', verifyToken, (req, res) => joinLobby(req, res, io));
    router.post('/leave', verifyToken, (req, res) => leaveLobby(req, res, io));
    router.post('/start', verifyToken, (req, res) => startLobby(req, res, io));
    router.get('/all', verifyToken, getAllLobbies);
    router.get('/:id', verifyToken, getLobby);
    router.delete('/:id', verifyToken, (req, res) => deleteLobby(req, res, io));
    router.delete('/deleteAll', verifyToken, (req, res) => deleteAllLobbies(req, res, io));
    router.delete('/deleteStarted', verifyToken, (req, res) => deleteStartedLobbies(req, res, io));
    return router;
};
