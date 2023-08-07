import React, { FC } from "react";

interface ColorInputProps {
  onChange: (color: string) => void;
}

export const ColorInput: FC<ColorInputProps> = ({ onChange }) => {
  return <input type="color" onChange={(e) => onChange(e.target.value)} />;
};
