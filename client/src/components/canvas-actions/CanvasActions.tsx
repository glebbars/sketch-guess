import { FC } from "react";
// import styles from "CanvasActions.module.scss";
import { ColorInput } from "./color-input/ColorInput";
import { LineWidthInput } from "./line-width-input/LineWidthInput";
import { ClearCanvasButton } from "./clear-canvas-button/ClearCanvasButton";
import { useCanvas } from "../../providers/CanvasProvider";

interface CanvasActionsProps {}

export const CanvasActions: FC<CanvasActionsProps> = () => {
  const { onChangeColor, onChangeLineWidth, onClearCanvas } = useCanvas();

  return (
    <div>
      <ColorInput onChange={onChangeColor} />
      <LineWidthInput onChange={onChangeLineWidth} />
      <ClearCanvasButton onClick={onClearCanvas} />
    </div>
  );
};
