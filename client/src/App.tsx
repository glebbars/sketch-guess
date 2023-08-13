import { Canvas } from "./components/canvas/Canvas";
import "./App.module.scss";
import { CanvasProvider } from "./providers/CanvasProvider";
import { CanvasActions } from "./components/canvas-actions/CanvasActions";
import { config } from "./config";

function App() {
  return (
    <CanvasProvider
      serverHost={config.REACT_APP_SERVER_HOST}
      serverWsHost={config.REACT_APP_SERVER_WS_HOST}
    >
      <Canvas />
      <CanvasActions />
    </CanvasProvider>
  );
}

export default App;
