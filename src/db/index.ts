import { updateUserList, updateLobbyList, updateGameList, updateGameData, updateLobbyData } from "../sockets/socketHandlers";
import { Server } from "socket.io";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const listenForUpdates = (io: Server) => {
    pool.connect((err, client) => {
      if (err || !client) {
        console.error("Error connecting to PostgreSQL", err);
        return;
      }
      console.log("CONNECTED")
      // Listen to PostgreSQL notifications for user, lobby, and game changes
      client.query("LISTEN user_changes");
      client.query("LISTEN lobby_changes");
      client.query("LISTEN game_changes");

      // Trigger specific update functions based on notification payloads
      client.on("notification", (msg) => {
        console.log("NOTIFICATION", msg)
        const payload = msg.payload ? JSON.parse(msg.payload) : null;

        switch (msg.channel) {
          case "user_changes":
            if (payload && (payload.action === "INSERT" || payload.action === "DELETE")) {
              updateUserList(io);
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

          default:
            console.warn(`Unrecognized channel: ${msg.channel}`);
        }
      });
    });
  };

export default pool;
