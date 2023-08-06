import React, { FC, useEffect } from "react";
import { useCanvas } from "../../providers/CanvasProvider";

interface CanvasProps {}

export const Canvas: FC<CanvasProps> = ({}) => {
  // todo ask about using context values correctly? If the default value of the context is null how can I destructure its values?
  const canvasContext = useCanvas();

  useEffect(() => {
    canvasContext?.prepareCanvas();
  }, []);

  return (
    <canvas
      ref={canvasContext?.canvasRef}
      onMouseDown={canvasContext?.startDrawing}
      onMouseMove={canvasContext?.draw}
      onMouseUp={canvasContext?.finishDrawing}
    />
  );
};
