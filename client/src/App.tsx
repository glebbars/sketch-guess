import React from "react";
import { Canvas } from "./components/canvas/Canvas";
import { CanvasProvider } from "./providers/CanvasProvider";
import "./App.module.scss";
import { ColorInput } from "./components/color-input/ColorInput";

function App() {
  return (
    <CanvasProvider>
      <Canvas />
      <ColorInput />
    </CanvasProvider>
  );
}

export default App;
