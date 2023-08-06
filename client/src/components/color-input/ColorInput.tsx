import React, { FC } from "react";
// import styles from "ColorInput.module.scss";
import { useCanvas } from "../../providers/CanvasProvider";

interface ColorInputProps {}

export const ColorInput: FC<ColorInputProps> = ({}) => {
  const { changeColor } = useCanvas();

  return <input type="color" onChange={(e) => changeColor(e.target.value)} />;
};
