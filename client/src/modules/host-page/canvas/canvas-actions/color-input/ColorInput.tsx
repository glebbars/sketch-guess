import { FC } from "react";
import { INITIAL_STROKE_COLOR } from "../../../../../services/canvas/constants";
import { CanvasActionsProps } from "../CanvasActions";

interface ColorInputProps {
  onChange: CanvasActionsProps["onChangeColor"];
}

export const ColorInput: FC<ColorInputProps> = ({ onChange }) => {
  return (
    <input
      defaultValue={INITIAL_STROKE_COLOR}
      type="color"
      onChange={onChange}
    />
  );
};
