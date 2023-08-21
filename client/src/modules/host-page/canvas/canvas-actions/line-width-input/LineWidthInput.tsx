import { FC } from "react";
import { INITIAL_LINE_WIDTH } from "../../../../../services/canvas/constants";
import { CanvasActionsProps } from "../CanvasActions";

interface ColorInputProps {
  onChange: CanvasActionsProps["onChangeLineWidth"];
}

export const LineWidthInput: FC<ColorInputProps> = ({ onChange }) => {
  return (
    <input
      defaultValue={INITIAL_LINE_WIDTH}
      type="number"
      onChange={onChange}
    />
  );
};
