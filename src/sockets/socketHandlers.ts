import { Server } from "socket.io";
import prisma from "../prismaClient";

// Emit an updated list of user names
export const updateUserList = async (io: Server) => {
    console.log("Updating User List");
  const users = await prisma.user.findMany();
  const userNames = users.map((user) => user.name);
  io.emit("userListUpdate", userNames);
};

// Emit an updated list of lobbies with players and status
export const updateLobbyList = async (io: Server) => {
    console.log("Updating Lobby List");
  const lobbyData = await prisma.lobby.findMany({
    include: {
      players: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  const lobbies = lobbyData.map((lobby) => (!lobby.started ? lobby : ""));
  io.emit("lobbyListUpdate", lobbies);
};

// Emit updated data for a specific lobby with players and optional game ID
export const updateLobbyData = async (io: Server, lobbyId: number, gameId?: number) => {
  const lobbyData = await prisma.lobby.findUnique({
    where: { id: lobbyId },
    include: {
      players: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  io.emit(`lobbyDataUpdate-${lobbyId}`, { ...lobbyData, gameId });
};

// Emit an updated list of games
export const updateGameList = async (io: Server) => {
    console.log("Updating Game List");
  const games = await prisma.game.findMany();
  io.emit("gameListUpdate", games);
};

// Emit updated data for a specific game with players
export const updateGameData = async (io: Server, gameId: number) => {
  const gameData = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      players: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  io.emit(`gameDataUpdate-${gameId}`, gameData);
};
