import express, { Express } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import http from "http";
import WebSocket from "ws";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use("/", routes);

const server = http.createServer(app); // Create an HTTP server

const wss = new WebSocket.Server({ server }); // Create a WebSocket server on the same HTTP server

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

// WebSocket connection handler
wss.on("connection", (socket: WebSocket) => {
  console.log("WebSocket connection established");

  // Handle the message, broadcast to other clients, etc.
  socket.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(JSON.parse(message.toString()))); // todo ask
      }
    });
  });

  // Handle WebSocket disconnection
  socket.on("close", () => {
    console.log("WebSocket connection closed");
    socket.send("closed");
  });

  // socket.send("Hi there, I am a WebSocket server");
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
