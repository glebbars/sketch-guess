import React, {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { noop } from "../utils/noop";

interface CanvasProviderProps {
  children: ReactNode;
}

type CanvasMouseEvent = React.MouseEvent<HTMLCanvasElement>;

interface ICanvasProvider {
  canvasRef: null | MutableRefObject<HTMLCanvasElement | null>;
  contextRef: null | MutableRefObject<CanvasRenderingContext2D | null>;

  prepareCanvas: noop;
  startDrawing: (event: CanvasMouseEvent) => void;
  draw: (event: CanvasMouseEvent) => void;
  finishDrawing: noop;
  changeColor: (color: string) => void;
  clearCanvas: noop;
}

const CanvasContext = createContext<ICanvasProvider>({
  canvasRef: null,
  contextRef: null,

  prepareCanvas: () => {},
  startDrawing: (_event: CanvasMouseEvent) => {},
  draw: (_event: CanvasMouseEvent) => {},
  finishDrawing: () => {},
  changeColor: (_color: string) => {},
  clearCanvas: () => {},
});

export const CanvasProvider = (props: CanvasProviderProps) => {
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const prepareCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    // to support high density screens (e.g. retina)
    canvas.width = window.innerWidth * 2; //
    canvas.height = window.innerHeight * 2; //

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;

    contextRef.current = context;
  };

  const startDrawing = (event: CanvasMouseEvent) => {
    const {
      nativeEvent: { offsetX, offsetY },
    } = event;

    if (!contextRef.current) return;

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);

    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const draw = (event: CanvasMouseEvent) => {
    if (!isDrawing) return;

    const {
      nativeEvent: { offsetX, offsetY },
    } = event;

    if (!contextRef.current) return;

    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  const clearCanvas = () => {
    return;
  };

  const changeColor = (color: string) => {
    const context = canvasRef.current?.getContext("2d");

    if (!context) return;

    context.strokeStyle = color;
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        clearCanvas,
        draw,
        startDrawing,
        finishDrawing,
        changeColor,
      }}
    >
      {props.children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
