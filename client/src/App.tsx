import React from "react";
import { Canvas } from "./components/canvas/Canvas";
import "./App.module.scss";
import { CanvasStoreProvider } from "./providers/CanvasStoreProvider";
import { CanvasActions } from "./components/canvas-actions/CanvasActions";

function App() {
  return (
    <CanvasStoreProvider>
      <Canvas />
      <CanvasActions />
    </CanvasStoreProvider>
  );
}

export default App;
