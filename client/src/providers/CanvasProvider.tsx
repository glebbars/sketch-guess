import {
  ChangeEvent,
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { CanvasMouseEvent, CanvasService } from "../services/CanvasService";
import {
  CanvasWebsocketService,
  IDrawingAction,
} from "../services/CanvasWebsocketService";
import { getCoordsFromMouseEvent } from "../utils/canvas";
import { noopType, noop } from "../utils/noop";

interface CanvasProviderProps {
  children: ReactNode;
  serverHost: string;
  serverWsHost: string;
}

interface ICanvasProvider {
  canvasRef: null | MutableRefObject<HTMLCanvasElement | null>;
  onCanvasMouseMove: (event: CanvasMouseEvent) => void;
  onCanvasMouseDown: (event: CanvasMouseEvent) => void;
  onCanvasMouseUp: (event: CanvasMouseEvent) => void;
  onChangeColor: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeLineWidth: (event: ChangeEvent<HTMLInputElement>) => void;
  onClearCanvas: noopType;

  guestCanvasRef: null | MutableRefObject<HTMLCanvasElement | null>;
}

const CanvasContext = createContext<ICanvasProvider>({
  canvasRef: null,
  onCanvasMouseMove: noop,
  onCanvasMouseDown: noop,
  onCanvasMouseUp: noop,

  onChangeColor: noop,
  onChangeLineWidth: noop,
  onClearCanvas: noop,

  guestCanvasRef: null,
});

export const CanvasProvider = (props: CanvasProviderProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const guestCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasService = useMemo(() => new CanvasService(), []);

  const handleDrawGuestCanvas = useCallback((action: IDrawingAction) => {
    const canvas = guestCanvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    const { color, lineWidth, points } = action;

    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.moveTo(points[0].x + 100, points[0].y + 100);

    context.lineTo(points[0].x + 100, points[0].y + 100);
    context.stroke();

    context.closePath();
    console.log(color, lineWidth, points[0].x, points[0].y);
  }, []);

  const canvasWebsocketService = useMemo(
    () => new CanvasWebsocketService(props.serverWsHost, handleDrawGuestCanvas),
    [props.serverWsHost, handleDrawGuestCanvas]
  );

  useEffect(() => {
    if (canvasRef.current) {
      canvasService.initCanvas(canvasRef.current);
    }
  }, [canvasService, canvasRef]);

  const handleCanvasMouseMove = useCallback(
    (event: CanvasMouseEvent) => {
      const { x, y } = getCoordsFromMouseEvent(event);

      canvasService?.draw({ x, y });

      canvasWebsocketService?.sendDrawingAction({
        type: "draw",
        color: canvasService?.color || "",
        lineWidth: canvasService?.lineWidth || 0,
        points: [{ x, y }],
      });
    },
    [canvasService, canvasWebsocketService]
  );

  const handleMouseDown = (event: CanvasMouseEvent) =>
    canvasService?.startDrawing(getCoordsFromMouseEvent(event));

  const handleCanvasMouseUp = () => canvasService?.finishDrawing();

  const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) =>
    canvasService.setColor(event.target.value);

  const handleChangeLineWidth = (event: ChangeEvent<HTMLInputElement>) =>
    canvasService.setLineWidth(Number(event.target.value));

  const handleClearCanvas = canvasService.clearCanvas;

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,

        onCanvasMouseMove: handleCanvasMouseMove,
        onCanvasMouseDown: handleMouseDown,
        onCanvasMouseUp: handleCanvasMouseUp,

        onChangeColor: handleChangeColor,
        onChangeLineWidth: handleChangeLineWidth,
        onClearCanvas: handleClearCanvas,

        guestCanvasRef,
      }}
    >
      {props.children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
