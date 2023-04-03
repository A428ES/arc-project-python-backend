import React, { useState, createContext } from "react";

const AuthContext = createContext([{}, () => {}]);

const AuthContextProvider = (props) => {
  const [authState, setAuthState] = useState({
    userLoggedIn: false,
  });
  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
