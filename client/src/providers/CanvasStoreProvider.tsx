import React, {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { CanvasStore } from "../store/CanvasStore";

interface CanvasProviderProps {
  children: ReactNode;
}

interface ICanvasStoreProvider {
  canvasStore: CanvasStore;
  canvasRef: null | MutableRefObject<HTMLCanvasElement | null>;
}

// todo ask init twice just to prevent store null?
const CanvasContext = createContext<ICanvasStoreProvider>({
  canvasStore: new CanvasStore(),
  canvasRef: null,
});

export const CanvasStoreProvider = (props: CanvasProviderProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasStore = useMemo(() => new CanvasStore(), []);

  useEffect(() => {
    if (canvasRef.current) {
      canvasStore.initCanvas(canvasRef.current);
    }
  }, [canvasStore, canvasRef]);

  return (
    <CanvasContext.Provider value={{ canvasStore, canvasRef }}>
      {props.children}
    </CanvasContext.Provider>
  );
};

export const useCanvasStore = () => useContext(CanvasContext);
