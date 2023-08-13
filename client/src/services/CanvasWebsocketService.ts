import { CanvasCoords } from "./CanvasService";

export interface IDrawingAction {
  type: "start" | "draw" | "finish";
  color: string;
  lineWidth: number;
  points: CanvasCoords[];
}

export class CanvasWebsocketService {
  private socket: WebSocket;

  constructor(socketUrl: string) {
    this.socket = new WebSocket(socketUrl);
    this.socket.addEventListener("open", () => {
      console.log("WebSocket connection established.");
    });

    this.socket.addEventListener("close", () => {
      console.log("WebSocket connection closed.");
    });
  }

  sendDrawingAction(action: IDrawingAction) {
    void action;
    // this.socket.send(JSON.stringify(action));
    this.socket.send("test messages");
  }
}
