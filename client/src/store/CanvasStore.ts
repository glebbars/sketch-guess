import React from "react";
import { makeAutoObservable } from "mobx";
import { INITIAL_STROKE_COLOR } from "../components/canvas/constants";

interface ICanvasStore {
  color: string;
  isDrawing: boolean;

  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
}

type CanvasMouseEvent = React.MouseEvent<HTMLCanvasElement>;

export class CanvasStore implements ICanvasStore {
  color: ICanvasStore["color"] = INITIAL_STROKE_COLOR;
  canvas: ICanvasStore["canvas"] = null;
  context: ICanvasStore["context"] = null;
  isDrawing: ICanvasStore["isDrawing"] = false;

  constructor(
    canvas: HTMLCanvasElement | null,
    context: CanvasRenderingContext2D | null
  ) {
    makeAutoObservable(this);
    this.canvas = canvas;
    this.context = context;
  }

  startDrawing = (event: CanvasMouseEvent) => {
    const {
      nativeEvent: { offsetX, offsetY },
    } = event;

    this.context?.beginPath();
    this.context?.moveTo(offsetX, offsetY);

    this.isDrawing = false;
  };

  finishDrawing = () => {
    this.context?.closePath();
    this.isDrawing = false;
  };

  draw = (event: CanvasMouseEvent) => {
    if (!this.isDrawing) return;

    const {
      nativeEvent: { offsetX, offsetY },
    } = event;

    this.context?.lineTo(offsetX, offsetY);
    this.context?.stroke();
  };

  clearCanvas = () => {
    return;
  };

  changeColor = (color: string) => {
    if (!this.context) return;

    this.context.strokeStyle = color;
  };
}
