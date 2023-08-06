import React, { FC, useEffect, useState } from "react";
// import styles from "ColorInput.module.scss";
import { useCanvas } from "../../providers/CanvasProvider";

interface ColorInputProps {}

export const ColorInput: FC<ColorInputProps> = ({}) => {
  const { changeColor } = useCanvas();
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    changeColor(color);
  }, [color]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return <input type="color" value={color} onChange={handleColorChange} />;
};
