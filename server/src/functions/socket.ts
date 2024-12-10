import { Manager } from "socket.io-client";
import type { IParticipants } from "../db/schema";

export class Socket {
  private socket;

  constructor(socketApi: string) {
    const manager = new Manager(socketApi, {
      path: "/server",
    });

    this.socket = manager.socket("/");
  }

  public sendWinners(winners: IParticipants) {
    this.socket.emit("server message", {
      winners: winners.map((winner) => ({
        ...winner,
        isWinner: true,
      })),
    });
  }

  public sendLoading(status: boolean) {
    this.socket.emit("activity", {
      status,
      activity: "lottery",
    });
  }
}
