import React from "react";
import { AuthContext } from "../context/user_context";
import { useContext } from "react";

export default function Content(prop) {
  const [authState, setAuthState] = useContext(AuthContext);

  const handleLogout = () => {
    authState.userLoggedIn = false;
    setAuthState(authState);
  };

  return (
    <>
      {authState.userLoggedIn === true ? (
        <div class="content">Thanks for logging in homie</div>
      ) : (
        <div class="content">You gotta login homie</div>
      )}
    </>
  );
}
