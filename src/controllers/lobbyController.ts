import { Request, Response } from "express";
import prisma from "../prismaClient";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const updateLobbyList = async (io: Server) => {
    const lobbyData = await prisma.lobby.findMany();
    const lobbies = lobbyData.map(lobby => !lobby.started?lobby:"");
    io.emit("lobbyListUpdate", lobbies);
};

// Create a new lobby and add the user to the lobby
export const createLobby = async (req: Request, res: Response, io: Server) => {
    const {userId, name} = req.body; // Make sure to get the user ID from the request
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

  try {
    // Check if the user is already in a lobby
    const userInLobby = await prisma.lobby.findFirst({
      where: { players: { some: { id: userId } } },
    });

    if (userInLobby) {
      return res.status(400).json({ message: "User is already in a lobby" });
    }

    // Create a new lobby and add the user
    const lobby = await prisma.lobby.create({
      data: {
        players: { connect: { id: userId } },
        name,
        started: false,
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


export const joinLobby = async (req: Request, res: Response, io: Server) => {
  const { lobbyId, userId } = req.body;

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
      where: { players: { some: { id: userId } } },
    });

    if (userInLobby) {
      return res.status(400).json({ message: "User is already in a lobby" });
    }

    // Add the user to the lobby
    await prisma.lobby.update({
      where: { id: lobbyId },
      data: {
        players: { connect: { id: userId } },
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

export const getAllLobbies = async (req: Request, res: Response) => {
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

export const getLobby = async (req: Request, res: Response) => {
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

export const startLobby = async (req: Request, res: Response, io: Server) => {
    const { lobbyId } = req.body;
  
    try {
      const lobby = await prisma.lobby.update({
        where: { id: lobbyId },
        data: { started: true },
      });
  
      await updateLobbyList(io);

      return res.status(200).json(lobby);
    } catch (error) {
      return res.status(500).json({ message: 'Error starting lobby', error });
    }
  };

export const deleteLobby = async (req: Request, res: Response, io: Server) => {
  const { lobbyId } = req.params;

  try {
    await prisma.lobby.delete({
      where: { id: Number(lobbyId) },
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

export const deleteAllLobbies = async (req: Request, res: Response, io: Server) => {
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

export const deleteStartedLobbies = async (req: Request, res: Response, io: Server) => {
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
