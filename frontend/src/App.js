import "./App.css";
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/navigationbar";
import Content from "./pages/content";
import UserLogin from "./pages/user/login";
import { AuthContext } from "./context/user_context";
import Protected from "./components/protected";
import MySettings from "./pages/user/settings";
import MySubmissions from "./pages/user/submissions";
import MyComments from "./pages/user/comments";
import AddComment from "./pages/user/add_comment";
import AddSubmission from "./pages/user/add_submission";
import RegisterAccount from "./pages/user/register";

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
      <article>
        <section>
          <Router>
            <Routes>
              <Route path="/" element={<Content />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/register" element={<RegisterAccount />}></Route>
              <Route
                path="/addsubmission"
                element={
                  <Protected isLoggedIn={authState.userLoggedIn}>
                      
                    <AddSubmission />
                  </Protected>
                }
              />
              <Route
                path="/addcomment"
                element={
                  <Protected isLoggedIn={authState.userLoggedIn}>
                      
                    <AddComment />
                  </Protected>
                }
              />

              <Route
                path="/mysettings"
                element={
                  <Protected isLoggedIn={authState.userLoggedIn}>
                      
                    <MySettings />
                  </Protected>
                }
              />
              <Route
                path="/mysubmissions"
                element={
                  <Protected isLoggedIn={authState.userLoggedIn}>
                      
                    <MySubmissions />
                  </Protected>
                }
              />
              <Route
                path="/mycomments"
                element={
                  <Protected isLoggedIn={authState.userLoggedIn}>
                      
                    <MyComments />
                  </Protected>
                }
              />
            </Routes>
          </Router>
        </section>
      </article>
    </>
  );
}

export default App;
