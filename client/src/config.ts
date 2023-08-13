const throwError = (variableName: string) => {
  throw new Error(
    `Environment variable ${variableName} is required for operation`
  );
};

export const config = {
  ENV: process.env.NODE_ENV,
  REACT_APP_SERVER_HOST: (process.env.REACT_APP_SERVER_HOST ||
    throwError("process.env.REACT_APP_SERVER_HOST")) as string,
  REACT_APP_SERVER_WS_HOST: (process.env.REACT_APP_SERVER_WS_HOST ||
    throwError("process.env.REACT_APP_SERVER_WS_HOST")) as string,
};
