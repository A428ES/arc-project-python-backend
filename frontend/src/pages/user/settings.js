import React, { useContext } from "react";
import { AuthContext } from "../../context/user_context";
import PageTitle from "../../components/page_title";

export default function MySettings() {
  const [authState, setAuthState] = useContext(AuthContext);

  return (
    <>
      <PageTitle text="Account Settings" />
      First Name: {authState.userData.firstname}
      <br />
      Last Name: {authState.userData.lastname}
      <br />
      Email: {authState.userData.email}
      <br />
      Member Since: {authState.userData.created}
      <br />
    </>
  );
}
