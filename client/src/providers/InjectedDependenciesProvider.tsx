import { createContext, FC, ReactNode, useContext } from "react";

interface InjectedDependenciesProviderProps
  extends InjectedDependenciesContextProps {
  children: ReactNode;
}

interface InjectedDependenciesContextProps {
  serverHost: string;
  serverWsHost: string;
}

const InjectedDependenciesContext =
  createContext<InjectedDependenciesContextProps>({
    serverHost: "",
    serverWsHost: "",
  });

export const InjectedDependenciesProvider: FC<
  InjectedDependenciesProviderProps
> = ({ children, serverWsHost, serverHost }) => {
  return (
    <InjectedDependenciesContext.Provider value={{ serverHost, serverWsHost }}>
      {children}
    </InjectedDependenciesContext.Provider>
  );
};

export const useInjectedDependenciesProvider = () =>
  useContext(InjectedDependenciesContext);
