import "./App.css";
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./layout/navigationbar";
import Content from "./layout/content";
import UserLogin from "./user/login";
import { AuthContext } from "./context/user_context";

function App() {
  const [authState, setAuthState] = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user_token");

    if (loggedInUser) {
      let lookUpUser = () => {
        fetch("http://localhost:5000//user/check_logged_in", {
          headers: { Authorization: "Bearer " + loggedInUser },
          method: "GET",
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            setAuthState({ userLoggedIn: true, userData: data.results });
          });
      };

      lookUpUser();
    }
  }, []);

  return (
    <>
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/login" element={<UserLogin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
