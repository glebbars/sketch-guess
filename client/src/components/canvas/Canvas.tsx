import { FC } from "react";
import styles from "./Canvas.module.scss";
import { useCanvas } from "../../providers/CanvasProvider";

interface CanvasProps {}

export const Canvas: FC<CanvasProps> = () => {
  const { canvasRef, onCanvasMouseUp, onCanvasMouseMove, onCanvasMouseDown } =
    useCanvas();

  return (
    <canvas
      className={styles.root}
      ref={canvasRef}
      onMouseUp={onCanvasMouseUp}
      onMouseMove={onCanvasMouseMove}
      onMouseDown={onCanvasMouseDown}
    />
  );
};
