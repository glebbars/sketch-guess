import React, { FC } from "react";
// import { useCanvasStore } from "../../../providers/CanvasStoreProvider";
import { INITIAL_LINE_WIDTH } from "../../../store/constants";

interface ColorInputProps {
  onChange: (lineWidth: number) => void;
}

export const LineWidthInput: FC<ColorInputProps> = ({ onChange }) => {
  return (
    <input
      defaultValue={INITIAL_LINE_WIDTH}
      type="number"
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
};
