import { CanvasCoords } from "./CanvasService";

export interface IDrawingAction {
  type: "start" | "draw" | "finish";
  color: string;
  lineWidth: number;
  points: CanvasCoords[];
}

export class CanvasWebsocketService {
  private socket: WebSocket;
  private readonly receiveDrawingActionCb: (action: IDrawingAction) => void;

  constructor(
    socketUrl: string,
    receiveDrawingActionCb: (action: IDrawingAction) => void
  ) {
    this.socket = new WebSocket(socketUrl);
    this.socket.addEventListener("open", () => {
      console.log("WebSocket connection established.");
    });

    this.socket.addEventListener("message", (event) => {
      try {
        const parsedMessage = JSON.parse(event.data.toString());

        this.receiveDrawingAction(parsedMessage);
      } catch (err) {
        console.log("failed to parse JSON received from WS");
      }
    });

    this.socket.addEventListener("close", () => {
      console.log("WebSocket connection closed.");
    });

    this.receiveDrawingActionCb = receiveDrawingActionCb;
  }

  sendDrawingAction(action: IDrawingAction) {
    this.socket.send(JSON.stringify(action));
  }

  receiveDrawingAction(action: IDrawingAction) {
    this.receiveDrawingActionCb(action);
  }
}
