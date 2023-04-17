import React, { useContext } from "react";
import { AuthContext } from "../../context/user_context";
import PageTitle from "../../components/page_title";

export default function MySettings() {
  const [authState, setAuthState] = useContext(AuthContext);

  return (
    <>
      <PageTitle text="Account Settings" />
      <section>
        <p>
          <h3>Your Information</h3>
          First Name:{" "}
          <input
            type="text"
            value={authState.userData.firstname}
            disabled="true"
          />
          Last Name:{" "}
          <input
            type="text"
            value={authState.userData.lastname}
            disabled="true"
          />
          <br />
          Email:{" "}
          <input
            type="text"
            value={authState.userData.email}
            size="30"
            disabled="true"
          />
        </p>
        <p>
          <h3>Change Password</h3>
          Current Password:
          <input type="text" />
          <br /> New Password: <input type="text" /> Confirm New Password:{" "}
          <input type="text" />
          <br />
          <input type="button" value="Change my password" />
        </p>
        <p>
          <h3>Account Stats</h3>
          Stories Posted: 0<br />
          Comments Posted: 0<br />
          Member Since: {authState.userData.created}
        </p>
        <br />
      </section>
    </>
  );
}
