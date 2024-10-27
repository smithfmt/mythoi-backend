import { Response } from "express";
import prisma from "../prismaClient";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { generatePlayerGenerals } from "../game/helpers";
import { PlayerData } from "../data/types";
import { cards } from "../data/cards";
import { updateGameData } from "../sockets";
import { Server } from "socket.io";
import { drawRandomCard, generateCard } from "../game/cardUtils";
import { shuffle } from "../utils";


export const createGame = async (lobby: any) => {
  try {
    const playerIds = lobby.players.map((player: any) => player.id);
    const playerGenerals = generatePlayerGenerals(lobby.players.length);
    const heroDeck:number[] = shuffle(Object.keys(cards.hero).map(str => parseInt(str)));
    const game = await prisma.game.create({
      data: {
        name: `Game for ${lobby.name}`,
        players: { connect: playerIds.map((id: number) => ({ id })) },
        host: lobby.host.toString(), 
        turn: lobby.players[0].id, 
        heroDeck,
        playerData: JSON.stringify(
          lobby.players.map((player: any, i:number) => ({
            player: player.id,
            generals: {
              selected: false,
              choices: playerGenerals[i],
            },
            board: [], 
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
  const { id } = req.params; 
  const gameId = parseInt(id, 10);
  if (isNaN(gameId)) {
    return res.status(400).json({ message: "Invalid game ID" });
  }
  try {
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

export const getAllGames = async (req: AuthenticatedRequest, res: Response) => {

  try {
    // Fetch the game by its ID, including related players and playerData
    const games = await prisma.game.findMany({
      include: {
        players: {
          select: {
            id: true,
            name: true,
          }
        },  // Include player details in the response
      },
    });

    return res.status(200).json(games);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching game", error });
  }
};

export const updateGame = async (req: AuthenticatedRequest, res: Response, io: Server) => {
  const { id } = req.params; 
  const userId = parseInt(req.body.user.id);
  const gameId = parseInt(id, 10);



  if (isNaN(gameId)) {
    return res.status(400).json({ message: "Invalid game ID" });
  }

  const { action, data } = req.body;
  if (!action) {
    return res.status(400).json({ message: "Action is required" });
  }

  try {
    // Fetch the current game, including playerData
    const game = await prisma.game.findUnique({
      where: { id: gameId },
    });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    let updatedGame;
    let playerData: PlayerData[] = JSON.parse(game.playerData as string);
    let playerIndex:number | undefined;
    playerData.forEach((p,i) => p.player===userId && (playerIndex = i));
    if (playerIndex===undefined) return res.status(404).json({ message: "Player not found" });
    switch (action) {
      case "selectGeneral":
        if (playerData[playerIndex].generals.selected) return res.status(401).json({ message: "Already Selected General" });
        const { generalId } = data;
        // Update the player's generals selected field and add the general to their board
        playerData[playerIndex].generals.selected = true;
        playerData[playerIndex].board.push({
          card: generateCard(cards.general[generalId]),  // Add the generalId as the card
          x: 5,
          y: 5,
        });

        const startingCards = [];
        for (let i=0;i<(generalId===4?5:3);i++) {
          startingCards.push(generateCard(drawRandomCard()))
        }
        playerData[playerIndex].hand = startingCards
        // Update the game with the modified playerData
        updatedGame = await prisma.game.update({
          where: { id: gameId },
          data: {
            playerData: JSON.stringify(playerData),  // Save the updated playerData back as JSON
          },
        });
        break;
      case "placeCard":
        updatedGame = await prisma.game.update({
          where: { id: gameId },
          data: {
            playerData: JSON.stringify(playerData),  // Save the updated playerData back as JSON
          },
        });
        break
      default:
        return res.status(400).json({ message: "Invalid action" });
    }
    updateGameData(io, gameId)
    return res.status(200).json(updatedGame);
  } catch (error) {
    console.error("Error updating game:", error);
    return res.status(500).json({ message: "Error updating game", error });
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

