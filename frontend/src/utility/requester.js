import { useState } from "react";

export default function HTTPRequester() {
  const [dataFeed, setData] = useState(null);
  const [errorFeed, setError] = useState(null);
  let errorOccured = false;

  const submitRequest = (
    path = "",
    req_method = "POST",
    arg_body = null,
    arg_headers = null
  ) => {
    let request_structure = {
      method: req_method,
    };

    if (arg_headers == null) {
      alert("here");
      request_structure.headers = {
        "Content-Type": "application/json",
      };

      if (localStorage.getItem("user_token")) {
        alert("adding headers");
        request_structure.headers.Authorization =
          "Bearer " + localStorage.getItem("user_token");
      }
    }

    if (req_method === "POST") {
      request_structure.body = JSON.stringify(arg_body);
    }

    fetch(
      `http://${process.env.REACT_APP_HOST}:5000/${path}`,
      request_structure
    )
      .then((response) => {
        if (!response.ok) {
          errorOccured = true;
        }

        return response.json();
      })
      .then((data) => {
        if (errorOccured === false) {
          setData(data);
        } else {
          setError(data.error);
        }
      });
  };

  return { dataFeed, errorFeed, submitRequest };
}
