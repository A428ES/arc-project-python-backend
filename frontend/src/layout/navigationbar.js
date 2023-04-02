import React from "react";
import { AuthContext } from "../context/user_context";
import { useContext } from "react";
import UserLogin from "../user/login";

export default function NavigationBar() {
  const [authState, setAuthState] = useContext(AuthContext);

  const handleLogout = () => {
    authState.userLoggedIn = false;
    setAuthState(authState);
  };

  return (
    <>
      {authState.userLoggedIn === true ? (
        <div class="topnav">
          <a class="user">Welcome, {authState.username}</a>
          <a href="#main">Main Page</a>
          <a href="#submit">Submit Story</a>
          <a href="#mysubmissions">My Submissions</a>
          <a href="#mycomments">My Comments</a>
          <a href="#mycomments">My Settings</a>
          <a href="" onClick={() => handleLogout()}>
            Logout
          </a>
        </div>
      ) : (
        <div class="topnav">
          <a class="user">
            <UserLogin />
          </a>
          <a href="#main">Main Page</a>
          <a href="#main">Register</a>
        </div>
      )}
    </>
  );
}
