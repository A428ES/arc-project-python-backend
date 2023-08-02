import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/user_context";
import PageTitle from "../../components/page_title";
import HTTPRequester from "../../utility/requester";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router";

export default function MySettings() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [proceessFeed, setFeed] = useState("");
  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();
  let handleSubmit = (event) => {
    changePassword();
    event.preventDefault();
  };

  useEffect(() => {
    if (dataFeed !== null && errorFeed === null) {
      if (dataFeed.results === "complete") {
        setAuthState({ userLoggedIn: false });
        localStorage.removeItem("user_token");
        confirmAlert({
          title: "Password changed successfully",
          message: "You will now be logged out",
          buttons: [
            {
              label: "Okay",
              onClick: () => navigate("/login"),
            },
          ],
        });
      }
    } else if (errorFeed !== null) {
      setFeed(errorFeed);
    }
  }, [dataFeed, errorFeed]);

  const changePassword = () => {
    const requestBody = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    if (newPassword === confirmPassword) {
      getData("user/changepw", "POST", requestBody);
    } else {
      setFeed("New password fields do not match");
    }
  };
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
          <div className="loginError">{proceessFeed}</div>
          <br />
          <form onSubmit={handleSubmit}>
            Current Password:
            <input
              type="password"
              name="old_password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <br /> New Password:{" "}
            <input
              type="password"
              name="new_password"
              onChange={(e) => setNewPassword(e.target.value)}
            />{" "}
            Confirm New Password:{" "}
            <input
              type="password"
              name="confirm_password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />
            <input type="submit" value="Change my password" />
          </form>
        </p>
        <p>
          <h3>Account Stats</h3>
          Stories Posted: {authState.userData.story_count}<br />
          Comments Posted: {authState.userData.comment_count}<br />
          Member Since: {authState.userData.created}
        </p>
        <br />
      </section>
    </>
  );
}
