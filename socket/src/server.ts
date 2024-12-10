import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
app.use(cors({ origin: "*" }));
const server = createServer(app);

const ioToServer = new Server(server, {
  path: "/server",
  connectionStateRecovery: {},
  cors: {
    origin: "*",
  }
});

const ioToClient = new Server(server, {
  path: "/client",
  connectionStateRecovery: {},
  cors: {
    origin: "*",
  },
});

ioToServer.on("connection", (socket) => {
  socket.on(
    "activity",
    ({ status, activity }: { status: boolean; activity: "lottery" }) => {
      console.log(status, activity);
      ioToClient.emit("status activity", {
        status,
        activity,
      });
    }
  );
  socket.on(
    "server message",
    ({
      winners,
    }: {
      winners: {
        id: number;
        numberTicket: number;
        isWinner: boolean;
        lot: number;
        createdAt: Date;
        updatedAt: Date;
      }[];
    }) => {
      winners.map((winner) => {
        ioToClient.emit(`client message ${winner.numberTicket}`, winner);
      });
      ioToClient.emit("winners", winners);
    }
  );
});
const port = process.env.PORT || 3333;

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
