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
import { CanvasWebsocketService } from "../services/CanvasWebsocketService";
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
}

const CanvasContext = createContext<ICanvasProvider>({
  canvasRef: null,
  onCanvasMouseMove: noop,
  onCanvasMouseDown: noop,
  onCanvasMouseUp: noop,

  onChangeColor: noop,
  onChangeLineWidth: noop,
  onClearCanvas: noop,
});

export const CanvasProvider = (props: CanvasProviderProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasService = useMemo(() => new CanvasService(), []);
  const canvasWebsocketService = useMemo(
    () => new CanvasWebsocketService(props.serverWsHost),
    [props.serverWsHost]
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
      }}
    >
      {props.children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
