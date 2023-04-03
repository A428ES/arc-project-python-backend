import React from "react";
import { AuthContext } from "../context/user_context";
import { useContext } from "react";

export default function NavigationBar() {
  const [authState, setAuthState] = useContext(AuthContext);

  const handleLogout = () => {
    setAuthState({ userLoggedIn: false });
    localStorage.removeItem("user_token");
  };

  return (
    <>
      <header id="banner">Story Publishing Website</header>
      {authState.userLoggedIn === true ? (
        <div id="navigation">
          <a href="/">Main Page</a>
          <a href="addsubmission">Submit Story</a>
          <a href="mysubmissions">My Submissions</a>
          <a href="mycomments">My Comments</a>
          <a href="mysettings">My Settings</a>
          <a href="" onClick={() => handleLogout()}>
            Logout
          </a>
        </div>
      ) : (
        <>
          <div id="navigation">
            <a href="/">Main Page</a>
            <a href="/register">Register</a>
            <a href="/login">Login</a>
          </div>
        </>
      )}
    </>
  );
}
