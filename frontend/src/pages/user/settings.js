import React, { useContext } from "react";
import { AuthContext } from "../../context/user_context";

export default function MySettings() {
  const [authState, setAuthState] = useContext(AuthContext);

  return (
    <>
      <header class="articleHeader" id="p1">
        My Settings
      </header>
      <p>
        First Name: {authState.userData.firstname}
        <br />
        Last Name: {authState.userData.lastname}
        <br />
        Email: {authState.userData.email}
        <br />
        Member Since: {authState.userData.created}
        <br />
      </p>
    </>
  );
}
