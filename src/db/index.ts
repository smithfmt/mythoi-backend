import { updateUserList, updateLobbyList, updateGameList, updateGameData, updateLobbyData, updateUserData, updatePlayerData, updateBattleData } from "../sockets/socketHandlers";
import { Server } from "socket.io";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

let client;

export const listenForUpdates = (io: Server) => {
    pool.connect((err, pgClient) => {
      if (err || !pgClient) {
        console.error("Error connecting to PostgreSQL", err);
        setTimeout(() => listenForUpdates(io), 5000); // Retry after 5 seconds if connection fails
        return;
      }

      client = pgClient;

      console.log("CONNECTED")
      // Listen to PostgreSQL notifications for user, lobby, and game changes
      client.query("LISTEN user_changes");
      client.query("LISTEN lobby_changes");
      client.query("LISTEN game_changes");
      client.query("LISTEN player_changes");
      client.query("LISTEN battle_changes");

      // Trigger specific update functions based on notification payloads
      client.on("notification", (msg) => {
        console.log("NOTIFICATION", msg.channel)
        const payload = msg.payload ? JSON.parse(msg.payload) : null;

        switch (msg.channel) {
          case "user_changes":
            if (payload && (payload.action === "INSERT" || payload.action === "DELETE")) {
              updateUserList(io);
            } else if (payload.action === "UPDATE") {
              updateUserData(io, payload.id);
            }
            break;

          case "lobby_changes":
            if (payload) {
              if (payload.action === "INSERT" || payload.action === "DELETE") {
                updateLobbyList(io);
              } else if (payload.action === "UPDATE") {
                updateLobbyData(io, payload.id);
              }
            }
            break;

          case "game_changes":
            if (payload) {
              if (payload.action === "INSERT" || payload.action === "DELETE") {
                updateGameList(io);
              } else if (payload.action === "UPDATE") {
                updateGameData(io, payload.id);
              }
            }
            break;

          case "player_changes":
            if (payload) {
              if (payload.action === "INSERT" || payload.action === "DELETE") {
                // updateGameList(io);
              } else if (payload.action === "UPDATE") {
                updatePlayerData(io, payload.id);
              }
            }
            break;
            
          case "battle_changes":
            if (payload) {
              if (payload.action === "INSERT" || payload.action === "DELETE") {
                // updateGameList(io);
              } else if (payload.action === "UPDATE") {
                updateBattleData(io, payload.id);
              }
            }
            break;

          default:
            console.warn(`Unrecognized channel: ${msg.channel}`);
        }
      });

      client.on("error", (err) => {
        console.error("PostgreSQL error:", err);
        // Retry connection after an error
        listenForUpdates(io);
      });
    });
  };

export default pool;
