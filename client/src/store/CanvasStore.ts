import React from "react";
import { INITIAL_LINE_WIDTH, INITIAL_STROKE_COLOR } from "./constants";

type CanvasMouseEvent = React.MouseEvent<HTMLCanvasElement>;

export interface ICanvasStore {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  isDrawing: boolean;

  initCanvas(canvasRef: HTMLCanvasElement): void;

  setColor(color: string): void;
  setLineWidth(lineWidth: number): void;

  startDrawing(event: CanvasMouseEvent): void;
  draw(event: CanvasMouseEvent): void;
  finishDrawing(): void;
  clearCanvas(): void;
}

export class CanvasStore implements ICanvasStore {
  canvas: ICanvasStore["canvas"] = null;
  context: ICanvasStore["context"] = null;
  isDrawing: ICanvasStore["isDrawing"] = false;

  initCanvas = (canvasRef: HTMLCanvasElement) => {
    this.canvas = canvasRef;

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

  startDrawing = (event: CanvasMouseEvent) => {
    const {
      nativeEvent: { offsetX, offsetY },
    } = event;

    if (this.context) {
      this.context.beginPath();
      this.context.moveTo(offsetX, offsetY);
      this.isDrawing = true;
    }
  };

  draw = (event: CanvasMouseEvent) => {
    if (!this.isDrawing) return;

    const {
      nativeEvent: { offsetX, offsetY },
    } = event;

    if (this.context) {
      this.context.lineTo(offsetX, offsetY);
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
}
