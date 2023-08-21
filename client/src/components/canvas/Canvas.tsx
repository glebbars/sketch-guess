import React, { FC, ForwardedRef, forwardRef } from "react";
import styles from "./Canvas.module.scss";

export type CanvasMouseEvent = React.MouseEvent<HTMLCanvasElement>;

interface CanvasProps {
  ref: ForwardedRef<HTMLCanvasElement>;
  onMouseUp?: (event: CanvasMouseEvent) => void;
  onMouseMove?: (event: CanvasMouseEvent) => void;
  onMouseDown?: (event: CanvasMouseEvent) => void;
}

export const Canvas: FC<CanvasProps> = forwardRef(
  ({ onMouseUp, onMouseMove, onMouseDown }, ref) => {
    return (
      <canvas
        ref={ref}
        className={styles.root}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
      />
    );
  }
);
