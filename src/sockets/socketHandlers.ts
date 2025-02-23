import { Server } from "socket.io";
import prisma from "../prismaClient";

// Emit an updated list of user names
export const updateUserList = async (io: Server) => {
  const users = await prisma.user.findMany();
  const userNames = users.map((user) => user.name);
  io.emit("userListUpdate", userNames);
};

export const updateUserData = async (io: Server, userId: number) => {
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      lobbyId: true,
      player: true,
    }
  });
  io.emit(`userDataUpdate-${userId}`, userData);
}

// Emit an updated list of lobbies with players and status
export const updateLobbyList = async (io: Server) => {
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
  io.emit("lobbyListUpdate", { data: { lobbies } });
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
      game: {
        select: {
          id: true,
        }
      }
    },
  });
  io.emit(`lobbyDataUpdate-${lobbyId}`, { ...lobbyData, gameId });
};

// Emit an updated list of games
export const updateGameList = async (io: Server) => {
  const games = await prisma.game.findMany();
  io.emit("gameListUpdate", games);
};

// Emit updated data for a specific game with players
export const updateGameData = async (io: Server, gameId: number) => {
  const gameData = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      players: true,
    },
  });
  io.emit(`gameDataUpdate-${gameId}`, gameData);
};

export const updatePlayerData = async (io: Server, playerId: number) => {
  const playerData = await prisma.player.findUnique({
    where: { id: playerId },
  });
  io.emit(`playerDataUpdate-${playerId}`, playerData);
};

export const updateBattleData = async (io: Server, battleId: number) => {
  const battleData = await prisma.battle.findUnique({
    where: { id: battleId },
  });
  io.emit(`battleDataUpdate-${battleId}`, battleData);
};

