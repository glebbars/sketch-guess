import { ChangeEvent, FC } from "react";
import { INITIAL_LINE_WIDTH } from "../../../services/constants";

interface ColorInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
