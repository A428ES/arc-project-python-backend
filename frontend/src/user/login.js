import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataReq, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState([]);
  const [userName, setUser] = useState([]);
  const [passWord, setPass] = useState([]);
  const navigate = useNavigate();

  let loginRequest = () => {
    console.log(userName);
    fetch(
      "http://localhost:5000/user/login?email=" +
        userName +
        "&password=" +
        passWord,
      { method: "GET" }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        setIsLoaded(true);
        setData(data);

        localStorage.setItem("user_token", data.results);
        console.log(data.results);
        navigate("/loggedin");
      })
      .catch((error) => setData({ results: "error" }));
  };

  let handleSubmit = (event) => {
    loginRequest();
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email Address:{" "}
        <input
          type="text"
          name="email"
          onChange={(e) => setUser(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:{" "}
        <input
          type="password"
          name="password"
          onChange={(e) => setPass(e.target.value)}
        />
      </label>
      <br />
      <input value="Login" type="submit" />
    </form>
  );
}
