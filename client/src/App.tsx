import "./App.module.scss";
import { config } from "./config";
import { GuestPage } from "./modules/guest-page/GuestPage";
// import { InjectedDependenciesProvider } from "./providers/InjectedDependenciesProvider";
import { HostPage } from "./modules/host-page/HostPage";
import { useMemo } from "react";
import { CanvasWebsocketService } from "./services/CanvasWebsocketService";
import { useIsGuestView } from "./modules/guest-page/hooks/useIsGuestView";

function App() {
  const canvasWebsocketService = useMemo(
    () => new CanvasWebsocketService(config.REACT_APP_SERVER_WS_HOST),
    []
  );

  const isGuestView = useIsGuestView();

  return (
    // todo move to scss
    <div style={{ display: "flex" }}>
      {isGuestView ? (
        <GuestPage canvasWebsocketService={canvasWebsocketService} />
      ) : (
        <HostPage canvasWebsocketService={canvasWebsocketService} />
      )}
    </div>
  );
}

export default App;
