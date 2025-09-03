import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import chatHandler from "./server/socket/chat.js";  // import your socket event handlers

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3001",  // Your Next.js client origin
      methods: ["GET", "POST"],
    },
  });

  chatHandler(io); // Initialize socket event handlers

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
