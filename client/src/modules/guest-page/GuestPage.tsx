import { FC, useMemo } from "react";
import { CanvasWebsocketService } from "../../services/CanvasWebsocketService";
import { GuestCanvas } from "./canvas/GuestCanvas";
import { CanvasService } from "../../services/canvas/CanvasService";

interface GuestViewProps {
  canvasWebsocketService: CanvasWebsocketService;
}

export const GuestPage: FC<GuestViewProps> = ({ canvasWebsocketService }) => {
  const canvasService = useMemo(() => new CanvasService(), []);

  return (
    <div>
      <h1>Guest View</h1>
      {/* chat */}
      <GuestCanvas
        canvasWebsocketService={canvasWebsocketService}
        canvasService={canvasService}
      />
    </div>
  );
};
