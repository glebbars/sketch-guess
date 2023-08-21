import { CanvasCoords } from "./canvas/CanvasService";
import { noop } from "../utils/noop";

export interface ICanvasAction {
  type: "draw" | "clear";
}

export interface ICanvasClearAction extends ICanvasAction {
  type: "clear";
}

export interface ICanvasDrawAction extends ICanvasAction {
  type: "draw";
  color: string;
  lineWidth: number;
  coords: CanvasCoords;
}

export class CanvasWebsocketService {
  private socket: WebSocket;
  receiveCanvasActionCb: (
    action: ICanvasDrawAction | ICanvasClearAction
  ) => void = noop; // todo solve optional

  constructor(socketUrl: string) {
    this.socket = new WebSocket(socketUrl);
    this.socket.addEventListener("open", () => {
      console.log("WebSocket connection established.");
    });

    this.socket.addEventListener("message", (event) => {
      try {
        const parsedMessage = JSON.parse(event.data.toString());
        console.log("receive message", parsedMessage);

        this.receiveCanvasActionCb(parsedMessage);
      } catch (err) {
        console.log("failed to parse JSON received from WS");
      }
    });

    this.socket.addEventListener("close", () => {
      console.log("WebSocket connection closed.");
    });
  }

  sendCanvasAction = (action: ICanvasDrawAction | ICanvasClearAction) => {
    this.socket.send(JSON.stringify(action));
  };

  receiveCanvasAction = (
    receiveCanvasActionCb: CanvasWebsocketService["receiveCanvasActionCb"]
  ) => {
    this.receiveCanvasActionCb = receiveCanvasActionCb;
  };
}
