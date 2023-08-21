import { FC, useMemo } from "react";
import { CanvasService } from "../../services/canvas/CanvasService";
import { HostCanvas } from "./canvas/HostCanvas";
import { CanvasWebsocketService } from "../../services/CanvasWebsocketService";

interface HostPageProps {
  canvasWebsocketService: CanvasWebsocketService;
}

export const HostPage: FC<HostPageProps> = ({ canvasWebsocketService }) => {
  const canvasService = useMemo(() => new CanvasService(), []);

  return (
    <div>
      <h1>Host View</h1>
      {/* chat*/}
      <HostCanvas
        canvasService={canvasService}
        canvasWebsocketService={canvasWebsocketService}
      />
    </div>
  );
};
