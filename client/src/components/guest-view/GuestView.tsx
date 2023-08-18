import { FC } from "react";
import { useCanvas } from "../../providers/CanvasProvider";
// import styles from 'GuestView.module.scss';

interface GuestViewProps {}

export const GuestView: FC<GuestViewProps> = () => {
  const { guestCanvasRef } = useCanvas();

  return (
    <canvas
      ref={guestCanvasRef}
      width={800}
      height={600}
      style={{ border: "1px solid black" }}
    />
  );
};
