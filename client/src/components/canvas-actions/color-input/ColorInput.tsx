import { ChangeEvent, FC } from "react";
import { INITIAL_STROKE_COLOR } from "../../../services/constants";

interface ColorInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
