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
      {authState.userLoggedIn === true ? (
        <div class="topnav">
          <a class="user">Welcome, {authState.userData}</a>
          <a href="/">Main Page</a>
          <a href="#submit">Submit Story</a>
          <a href="#mysubmissions">My Submissions</a>
          <a href="#mycomments">My Comments</a>
          <a href="#mycomments">My Settings</a>
          <a href="" onClick={() => handleLogout()}>
            Logout
          </a>
        </div>
      ) : (
        <>
          <div class="topnav">
            <a href="#main">Main Page</a>
            <a href="#main">Register</a>
            <a href="/login">Login</a>
          </div>
        </>
      )}
    </>
  );
}
