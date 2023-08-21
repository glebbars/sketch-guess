import { ChangeEvent, FC, useCallback, useEffect, useRef } from "react";
import { Canvas, CanvasMouseEvent } from "../../../components/canvas/Canvas";
import { CanvasService } from "../../../services/canvas/CanvasService";
import { getCoordsFromMouseEvent } from "../../../utils/canvas";
import { CanvasActions } from "./canvas-actions/CanvasActions";
import { CanvasWebsocketService } from "../../../services/CanvasWebsocketService";

interface HostCanvasProps {
  canvasService: CanvasService;
  canvasWebsocketService: CanvasWebsocketService;
}

export const HostCanvas: FC<HostCanvasProps> = ({
  canvasService,
  canvasWebsocketService,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasService.initCanvas(canvasRef.current);
    }
  }, [canvasService, canvasRef]);

  const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) =>
    canvasService.setColor(event.target.value);

  const handleChangeLineWidth = (event: ChangeEvent<HTMLInputElement>) =>
    canvasService.setLineWidth(Number(event.target.value));

  const handleMouseDown = (event: CanvasMouseEvent) =>
    canvasService?.startDrawing(getCoordsFromMouseEvent(event));

  const handleCanvasMouseUp = () => canvasService.finishDrawing();

  const handleCanvasMouseMove = useCallback(
    (event: CanvasMouseEvent) => {
      const { x, y } = getCoordsFromMouseEvent(event);

      canvasService.draw({ x, y }, canvasWebsocketService.sendCanvasAction);
    },
    [canvasService, canvasWebsocketService]
  );
  const handleClearCanvas = () => {
    canvasService.clearCanvas(canvasWebsocketService.sendCanvasAction);
  };

  return (
    <div>
      <Canvas
        ref={canvasRef}
        onMouseUp={handleCanvasMouseUp}
        onMouseMove={handleCanvasMouseMove}
        onMouseDown={handleMouseDown}
      />
      <CanvasActions
        onChangeColor={handleChangeColor}
        onChangeLineWidth={handleChangeLineWidth}
        onClearCanvas={handleClearCanvas}
      />
    </div>
  );
};
