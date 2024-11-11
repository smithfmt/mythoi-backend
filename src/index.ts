import express from "express";
import http from "http";
import cors from "cors";
import { setupSocketServer } from "./sockets/socketServer";

const app = express();
const server = http.createServer(app);

setupSocketServer(server);

app.use(cors());
app.use(express.json());

// Setup routes

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});