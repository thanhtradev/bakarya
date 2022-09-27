import React, { useState } from "react";

const LoginContext = React.createContext();

export const AuthContextProvider = (props) => {
  const [isLoggined, setIsLoggined] = useState(false);

  return (
    <LoginContext.Provider value={isLoggined}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
