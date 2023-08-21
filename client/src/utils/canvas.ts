import { CanvasMouseEvent } from "../components/canvas/Canvas";

export const getCoordsFromMouseEvent = (event: CanvasMouseEvent) => {
  const {
    nativeEvent: { offsetX, offsetY },
  } = event;

  return { x: offsetX, y: offsetY };
};
