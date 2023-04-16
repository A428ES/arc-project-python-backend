import React from "react";
import { useState, useEffect } from "react";
import HTTPRequester from "../../utility/requester";
import PageTitle from "../../components/page_title";

export default function RegisterAccount() {
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [password, setPassword] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState([]);
  const [email, setEmail] = useState([]);
  const [confirmEmail, setConfirmEmail] = useState([]);
  const [proceessFeed, setFeed] = useState([""]);
  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();

  useEffect(() => {
    if (dataFeed !== null && errorFeed === null) {
      setFeed(<>Your registration was successful!</>);
    } else if (errorFeed !== null) {
      setFeed(errorFeed);
    }
  }, [dataFeed]);

  let handleSubmit = (event) => {
    loginRequest();
    event.preventDefault();
  };

  let loginRequest = () => {
    let validAttempt = true;

    if (confirmEmail !== email) {
      setFeed("emails do not match");
      validAttempt = false;
    }

    if (password !== confirmPassword) {
      setFeed("passwords do not match");
      validAttempt = false;
    }

    if (validAttempt === true) {
      let requestBody = {
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
      };

      getData("user/register", "POST", requestBody);
    }
  };

  return (
    <>
      <PageTitle text="Register New Account" />
      <section>
        <div className="content">
          <div className="loginError">{proceessFeed}</div>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:{" "}
              <input
                type="text"
                name="firstname"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label>
              Last Name:{" "}
              <input
                type="text"
                name="lastname"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Email:{" "}
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Confirm Email:{" "}
              <input
                type="email"
                name="confirm_email"
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
            </label>
            <br />
            <label>
              Password:{" "}
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label>
              Confirm Password:{" "}
              <input
                type="password"
                name="confirm_password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <input value="Register" type="submit" />
          </form>
        </div>
      </section>
    </>
  );
}
