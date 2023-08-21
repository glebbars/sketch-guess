import { FC } from "react";
import { CanvasActionsProps } from "../CanvasActions";
// import styles from "ClearCanvasButton.module.scss";

interface ClearCanvasButtonProps {
  onClick: CanvasActionsProps["onClearCanvas"];
}

export const ClearCanvasButton: FC<ClearCanvasButtonProps> = ({ onClick }) => {
  return <button onClick={() => onClick()}>Clear</button>;
};
