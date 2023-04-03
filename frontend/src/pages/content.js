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
      <header class="articleHeader" id="p1">
        Main Story Page
      </header>
      {authState.userLoggedIn == true ? (
        <p>
          Thanks for logging in {authState.userData}! This page is still in
          progress
        </p>
      ) : (
        <p>You need to login </p>
      )}
    </>
  );
}
