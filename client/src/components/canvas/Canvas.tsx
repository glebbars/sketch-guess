import React, { FC } from "react";
import styles from "./Canvas.module.scss";
import { useCanvasStore } from "../../providers/CanvasStoreProvider";

interface CanvasProps {}

export const Canvas: FC<CanvasProps> = () => {
  const {
    canvasRef,
    canvasStore: { startDrawing, draw, finishDrawing },
  } = useCanvasStore();

  return (
    <canvas
      className={styles.root}
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={finishDrawing}
    />
  );
};
