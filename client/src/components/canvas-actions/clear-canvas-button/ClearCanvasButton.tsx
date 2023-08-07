import React, { FC } from "react";
import { noop } from "../../../utils/noop";
// import styles from "ClearCanvasButton.module.scss";

interface ClearCanvasButtonProps {
  onClick: noop;
}

export const ClearCanvasButton: FC<ClearCanvasButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Clear</button>;
};
