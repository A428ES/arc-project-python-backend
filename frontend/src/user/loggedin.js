import React, { useEffect, useState } from "react";

export default function UserLoggedIn() {
  let [loggedIn, setLoggedIn] = useState([]);

  let checkLoggedIn = () => {
    fetch("http://localhost:5000/user/check_logged_in", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        setLoggedIn(data);
      });
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return loggedIn.results;
}
