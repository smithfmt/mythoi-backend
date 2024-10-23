import { Response } from "express";
import prisma from "../prismaClient";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { Server } from "socket.io";
import { createGame } from "./gameController";
import { updateLobbyList } from "../sockets";



// Create a new lobby and add the user to the lobby
export const createLobby = async (req: AuthenticatedRequest, res: Response, io: Server) => {
    const { user, name} = req.body; // Make sure to get the user ID from the request
    if (!user?.id) {
      return res.status(400).json({ message: "User ID is required." });
    }

  try {
    // Check if the user is already in a lobby
    const userInLobby = await prisma.lobby.findFirst({
      where: { players: { some: { id: user.id } } },
    });

    if (userInLobby) {
      return res.status(400).json({ message: "User is already in a lobby" });
    }

    // Create a new lobby and add the user
    const lobby = await prisma.lobby.create({
      data: {
        players: { connect: { id: user.id } },
        name,
        started: false,
        host: user.id,
      },
    });

    await updateLobbyList(io);

    return res.status(201).json({ message: "Lobby created", lobby });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};


export const joinLobby = async (req: AuthenticatedRequest, res: Response, io: Server) => {
  const { lobbyId, user } = req.body;

  try {
    // Check if the lobby exists
    const lobby = await prisma.lobby.findUnique({
      where: { id: lobbyId },
    });

    if (!lobby) {
      return res.status(404).json({ message: "Lobby not found" });
    }

    // Check if the user is already in another lobby
    const userInLobby = await prisma.lobby.findFirst({
      where: { players: { some: { id: user.id } } },
    });

    if (userInLobby) {
      return res.status(400).json({ message: "User is already in a lobby" });
    }

    // Add the user to the lobby
    await prisma.lobby.update({
      where: { id: lobbyId },
      data: {
        players: { connect: { id: user.id } },
      },
    });

    await updateLobbyList(io);

    return res.status(200).json({ message: "Joined lobby successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const leaveLobby = async (req: AuthenticatedRequest, res: Response, io: Server) => {
  const { user } = req.body;
  if (!user) return res.status(404).json({ message: "No user found" });
  try {
    // Check if the user is in a lobby
    const userLobby = await prisma.lobby.findFirst({
      where: { players: { some: { id: user.id } } },
    });

    if (!userLobby) {
      return res.status(404).json({ message: "User is not in any lobby" });
    }

    // Remove the user from the lobby
    await prisma.lobby.update({
      where: { id: userLobby.id },
      data: {
        players: {
          disconnect: { id: user.id },
        },
      },
    });

    // If the user was the last player, delete the lobby
    const remainingPlayers = await prisma.lobby.findUnique({
      where: { id: userLobby.id },
      include: { players: true },
    });

    if (remainingPlayers && remainingPlayers.players.length === 0) {
      await prisma.lobby.delete({
        where: { id: userLobby.id },
      });
    }

    await updateLobbyList(io); // Update the lobby list for all clients

    return res.status(200).json({ message: "Left the lobby successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};


export const getAllLobbies = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const lobbies = await prisma.lobby.findMany({
      where: { started: false },
      include: { players: true },
    });

    return res.status(200).json(lobbies);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getLobby = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  try {
    const lobby = await prisma.lobby.findUnique({
      where: { id: Number(id) },
      include: { players: true },
    });

    if (!lobby) {
      return res.status(404).json({ message: "Lobby not found" });
    }

    return res.status(200).json(lobby);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const startLobby = async (req: AuthenticatedRequest, res: Response, io: Server) => {
  const { lobbyId, user } = req.body;

  try {
    // Find and update the lobby to started
    const lobby = await prisma.lobby.update({
      where: { id: parseInt(lobbyId), players: { some: { id: user.id } } },
      include: { players: true },
      data: { started: true },
    });
    // Create the game using the players in the lobby
    const game = await createGame(lobby);  // Assuming the createGame function uses the lobby details to create the game
    console.log(game)
    // After creating the game, delete the lobby
    await prisma.lobby.delete({
      where: { id: lobbyId },
    });
    await updateLobbyList(io);

    return res.status(200).json({ message: "Lobby started and game created", game });
  } catch (error) {
    return res.status(500).json({ message: 'Error starting lobby', error });
  }
};

export const deleteLobby = async (req: AuthenticatedRequest, res: Response, io: Server) => {
  const { id } = req.params;
  const { user } = req.body

  try {
    await prisma.lobby.delete({
      where: { id: Number(id), host: user.id },
    });

    await updateLobbyList(io);

    return res.status(200).json({ message: "Lobby deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const deleteAllLobbies = async (req: AuthenticatedRequest, res: Response, io: Server) => {
  try {
    await prisma.lobby.deleteMany();

    await updateLobbyList(io);

    return res.status(200).json({ message: "All lobbies deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const deleteStartedLobbies = async (req: AuthenticatedRequest, res: Response, io: Server) => {
  try {
    await prisma.lobby.deleteMany({
      where: { started: true },
    });

    await updateLobbyList(io);

    return res.status(200).json({ message: "Started lobbies deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
