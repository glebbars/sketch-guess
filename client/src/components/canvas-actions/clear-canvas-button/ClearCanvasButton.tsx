import { FC } from "react";
import { noopType } from "../../../utils/noop";
// import styles from "ClearCanvasButton.module.scss";

interface ClearCanvasButtonProps {
  onClick: noopType;
}

export const ClearCanvasButton: FC<ClearCanvasButtonProps> = ({ onClick }) => {
  return <button onClick={() => onClick()}>Clear</button>;
};
