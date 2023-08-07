import React, { FC } from "react";
// import styles from "CanvasActions.module.scss";
import { ColorInput } from "./color-input/ColorInput";
import { LineWidthInput } from "./line-width-input/LineWidthInput";
import { ClearCanvasButton } from "./clear-canvas-button/ClearCanvasButton";
import { useCanvasStore } from "../../providers/CanvasStoreProvider";

interface CanvasActionsProps {}

export const CanvasActions: FC<CanvasActionsProps> = ({}) => {
  const {
    canvasStore: { setColor, setLineWidth, clearCanvas },
  } = useCanvasStore();

  return (
    <div>
      <ColorInput onChange={setColor} />
      <LineWidthInput onChange={setLineWidth} />
      <ClearCanvasButton onClick={clearCanvas} />
    </div>
  );
};
