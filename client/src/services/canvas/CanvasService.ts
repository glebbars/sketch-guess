import { INITIAL_LINE_WIDTH, INITIAL_STROKE_COLOR } from "./constants";
import {
  ICanvasClearAction,
  ICanvasDrawAction,
} from "../CanvasWebsocketService";

export type CanvasCoords = { x: number; y: number };

export interface ICanvasService {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  isDrawing: boolean;

  readonly color: string;
  readonly lineWidth: number;

  initCanvas(canvas: HTMLCanvasElement): void;

  setColor(color: string): void;
  setLineWidth(lineWidth: number): void;

  startDrawing({ x, y }: CanvasCoords): void;
  draw(
    { x, y }: CanvasCoords,
    sendDrawingCb: (action: ICanvasDrawAction) => void
  ): void;
  finishDrawing(): void;
  clearCanvas(sendClearCb?: (action: ICanvasClearAction) => void): void; // todo optional not best practice
}

export class CanvasService implements ICanvasService {
  canvas: ICanvasService["canvas"] = null;
  context: ICanvasService["context"] = null;
  isDrawing: ICanvasService["isDrawing"] = false;

  initCanvas = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas;

    this.canvas.width = window.innerWidth; //
    this.canvas.height = window.innerHeight; //

    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;

    const context = this.canvas.getContext("2d");

    if (!context) return;

    // context.scale(2, 2);
    context.lineCap = "round";
    this.setColor(INITIAL_STROKE_COLOR);
    this.setLineWidth(INITIAL_LINE_WIDTH);

    this.context = context;
  };

  setColor: ICanvasService["setColor"] = (color) => {
    if (this.context) {
      this.context.strokeStyle = color;
    }
  };

  setLineWidth: ICanvasService["setLineWidth"] = (lineWidth) => {
    if (this.context) {
      this.context.lineWidth = lineWidth;
    }
  };

  startDrawing: ICanvasService["startDrawing"] = ({ x, y }) => {
    if (this.context) {
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.isDrawing = true;
    }
  };

  draw: ICanvasService["draw"] = ({ x, y }, sendDrawCb) => {
    if (this.isDrawing && this.context) {
      this.context.lineTo(x, y);
      this.context.stroke();

      sendDrawCb({
        type: "draw",
        color: this.color,
        lineWidth: this.lineWidth,
        coords: { x, y },
      });
    }
  };

  finishDrawing: ICanvasService["finishDrawing"] = () => {
    if (this.context) {
      this.context.closePath();
      this.isDrawing = false;
    }
  };

  clearCanvas: ICanvasService["clearCanvas"] = (sendClearCb) => {
    if (this.context && this.canvas) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      sendClearCb?.({ type: "clear" });
    }
  };

  get color(): ICanvasService["color"] {
    return (this.context?.strokeStyle || INITIAL_STROKE_COLOR) as string;
  }

  get lineWidth(): ICanvasService["lineWidth"] {
    return this.context?.lineWidth || INITIAL_LINE_WIDTH;
  }
}
