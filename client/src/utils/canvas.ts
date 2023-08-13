import { CanvasMouseEvent } from "../services/CanvasService";

export const getCoordsFromMouseEvent = (event: CanvasMouseEvent) => {
  const {
    nativeEvent: { offsetX, offsetY },
  } = event;

  return { x: offsetX, y: offsetY };
};
