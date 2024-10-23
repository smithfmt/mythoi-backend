import { Response } from "express";
import prisma from "../prismaClient";
import { AuthenticatedRequest } from "../middleware/verifyToken";

export const createGame = async (lobby: any) => {
  try {
    const playerIds = lobby.players.map((player: any) => player.id);
    const game = await prisma.game.create({
      data: {
        name: `Game for ${lobby.name}`,
        players: { connect: playerIds.map((id: number) => ({ id })) },
        host: lobby.host.toString(), // Assuming host is a User ID stored as an integer
        turn: lobby.players[0].name, // Assuming the first player takes the first turn
        drawnHeroes: [],
        playerData: JSON.stringify(
          lobby.players.map((player: any) => ({
            player: player.name,
            board: [], // Initialize an empty board for each player
            basicCount: 0,
          }))
        ),
      },
    });

    return game;
  } catch (error) {
    console.error("Error creating game:", error);
    throw new Error("Error creating game");
  }
};

// Function to get a game by ID
export const getGame = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;  // Now TypeScript knows that params exists
    try {
      // Parse the id to an integer
      const gameId = parseInt(id, 10);
      if (isNaN(gameId)) {
        return res.status(400).json({ message: "Invalid game ID" });
      }
  
      // Fetch the game by its ID, including related players and playerData
      const game = await prisma.game.findUnique({
        where: { id: gameId },
        include: {
          players: true,  // Include player details in the response
        },
      });
  
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
  
      return res.status(200).json(game);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching game", error });
    }
  };

  // Function to delete all games
export const deleteAllGames = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await prisma.game.deleteMany({});
    return res.status(200).json({ message: "All games deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting games", error });
  }
};

