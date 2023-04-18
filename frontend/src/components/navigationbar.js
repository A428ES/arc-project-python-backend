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
      <header id="banner">Untitled Project</header>
      <div id="navigation">
        {authState.userLoggedIn === true ? (
          <>
            <a className="nav" href="/">
              Main Page
            </a>
            <a className="nav" href="addsubmission">
              Submit Story
            </a>
            <a className="nav" href="mysubmissions">
              My Submissions
            </a>
            <a className="nav" href="mycomments">
              My Comments
            </a>
            <a className="nav" href="mysettings">
              My Settings
            </a>
            <a className="nav" href="" onClick={() => handleLogout()}>
              Logout
            </a>
            <a className="nav" href="/search">
              Search
            </a>
          </>
        ) : (
          <>
            {" "}
            <a className="nav" href="/">
              Main Page
            </a>
            <a className="nav" href="/register">
              Register
            </a>
            <a className="nav" href="/login">
              Login
            </a>
            <a className="nav" href="/search">
              Search
            </a>
          </>
        )}
      </div>
    </>
  );
}
