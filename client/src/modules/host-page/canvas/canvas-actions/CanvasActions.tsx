import { ChangeEvent, FC } from "react";
// import styles from "CanvasActions.module.scss";
import { ColorInput } from "./color-input/ColorInput";
import { LineWidthInput } from "./line-width-input/LineWidthInput";
import { ClearCanvasButton } from "./clear-canvas-button/ClearCanvasButton";
import { noopType } from "../../../../utils/noop";

export interface CanvasActionsProps {
  onChangeColor: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeLineWidth: (event: ChangeEvent<HTMLInputElement>) => void;
  onClearCanvas: noopType;
}

export const CanvasActions: FC<CanvasActionsProps> = ({
  onChangeColor,
  onChangeLineWidth,
  onClearCanvas,
}) => {
  return (
    <div>
      <ColorInput onChange={onChangeColor} />
      <LineWidthInput onChange={onChangeLineWidth} />
      <ClearCanvasButton onClick={onClearCanvas} />
    </div>
  );
};
