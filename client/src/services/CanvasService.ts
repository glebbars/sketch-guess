import React from "react";

const INITIAL_STROKE_COLOR = "#000000";
const INITIAL_LINE_WIDTH = 5;

export type CanvasMouseEvent = React.MouseEvent<HTMLCanvasElement>;
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
  draw({ x, y }: CanvasCoords): void;
  finishDrawing(): void;
  clearCanvas(): void;
}

export class CanvasService implements ICanvasService {
  canvas: ICanvasService["canvas"] = null;
  context: ICanvasService["context"] = null;
  isDrawing: ICanvasService["isDrawing"] = false;

  initCanvas = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas;

    // to support high density screens (e.g. retina)
    this.canvas.width = window.innerWidth * 2; //
    this.canvas.height = window.innerHeight * 2; //

    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;

    const context = this.canvas.getContext("2d");

    if (!context) return;

    context.scale(2, 2);
    context.lineCap = "round";
    this.setColor(INITIAL_STROKE_COLOR);
    this.setLineWidth(INITIAL_LINE_WIDTH);

    this.context = context;
  };

  setColor = (color: string) => {
    if (this.context) {
      this.context.strokeStyle = color;
    }
  };

  setLineWidth = (lineWidth: number) => {
    if (this.context) {
      this.context.lineWidth = lineWidth;
    }
  };

  startDrawing = ({ x, y }: CanvasCoords) => {
    if (this.context) {
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.isDrawing = true;
    }
  };

  draw = ({ x, y }: CanvasCoords) => {
    if (!this.isDrawing) return;

    if (this.context) {
      this.context.lineTo(x, y);
      this.context.stroke();
    }
  };

  finishDrawing = () => {
    if (this.context) {
      this.context.closePath();
      this.isDrawing = false;
    }
  };

  clearCanvas = () => {
    if (this.context && this.canvas) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  };

  get color() {
    return (this.context?.strokeStyle || INITIAL_STROKE_COLOR) as string;
  }

  get lineWidth() {
    return this.context?.lineWidth || INITIAL_LINE_WIDTH;
  }
}
