import { FC, useEffect, useRef } from "react";
import { CanvasService } from "../../../services/canvas/CanvasService";
import { CanvasWebsocketService } from "../../../services/CanvasWebsocketService";
import { Canvas } from "../../../components/canvas/Canvas";

interface GuestCanvasProps {
  canvasService: CanvasService;
  canvasWebsocketService: CanvasWebsocketService;
}

export const GuestCanvas: FC<GuestCanvasProps> = ({
  canvasService,
  canvasWebsocketService,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasService.initCanvas(canvasRef.current);
    }
  }, [canvasService]);

  useEffect(() => {
    canvasWebsocketService.receiveCanvasAction((action) => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const context = canvas.getContext("2d");

      if (!context) return;

      switch (action.type) {
        case "clear":
          canvasService.clearCanvas();
          break;

        case "draw":
          const { color, lineWidth, coords } = action;

          context.strokeStyle = color;
          context.lineWidth = lineWidth;

          context.beginPath();
          context.moveTo(coords.x, coords.y);

          context.lineTo(coords.x, coords.y);
          context.stroke();
          break;

        default:
      }
    });
  }, [canvasService, canvasWebsocketService]);

  return <Canvas ref={canvasRef} />;
};
