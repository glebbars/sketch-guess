import React, { FC, useEffect } from "react";
import { useCanvas } from "../../providers/CanvasProvider";
import styles from "./Canvas.module.scss";
import { observer } from "mobx-react-lite";
import { CanvasStore } from "../../store/CanvasStore";

interface CanvasProps {
  canvasStore: CanvasStore;
}

export const Canvas: FC<CanvasProps> = observer(({ canvasStore }) => {
  const { canvasRef, prepareCanvas, startDrawing, draw, finishDrawing } =
    useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <canvas
      className={styles.root}
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={finishDrawing}
    />
  );
});
