import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/navigationbar";
import UserLogin from "./pages/user/login";
import { AuthContext } from "./context/user_context";
import Protected from "./components/protected";
import MySettings from "./pages/user/settings";
import MyComments from "./pages/user/comments";
import AddComment from "./pages/user/add_comment";
import AddSubmission from "./pages/user/add_submission";
import RegisterAccount from "./pages/user/register";
import CommentDisplay from "./components/comment_display";
import HTTPRequester from "./utility/requester";
import StoryViewer from "./components/story_viewer";

function App() {
  const [authState, setAuthState] = useContext(AuthContext);
  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();
  const [processingLoad, setLoading] = useState(true);

  useEffect(() => {
    if (errorFeed !== null) {
      localStorage.clear();
      setLoading(false);
    }

    if (dataFeed !== null && errorFeed === null) {
      setAuthState({ userLoggedIn: true, userData: dataFeed.results });
      setLoading(false);
    } else {
      if (localStorage.getItem("user_token")) {
        getData("/user/check_logged_in", "GET");
      } else {
        setLoading(false);
      }
    }
  }, [dataFeed, errorFeed]);

  return (
    <>
      {processingLoad === false ? (
        <>
          <NavigationBar />
          <article>
            <p class="content">
              <Router>
                <Routes>
                  <Route path="/" element={<StoryViewer author="" />} />
                  <Route path="/login" element={<UserLogin />} />
                  <Route path="/viewcomments" element={<CommentDisplay />} />
                  <Route path="/register" element={<RegisterAccount />}></Route>
                  <Route
                    path="/search"
                    element={<StoryViewer author="stories/search" />}
                  />
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
                        <StoryViewer author="stories/mystories" />
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
              </Router>{" "}
            </p>
          </article>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
