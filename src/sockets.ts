import { Server } from "socket.io";
import prisma from "./prismaClient";

export const updateLobbyList = async (io: Server) => {
    const lobbyData = await prisma.lobby.findMany();
    const lobbies = lobbyData.map(lobby => !lobby.started?lobby:"");
    io.emit("lobbyListUpdate", lobbies);
};