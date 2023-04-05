import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/user_context";

export default function AddSubmission() {
  const [storyContent, setStory] = useState([]);
  const [storyTitle, setTitle] = useState([]);
  const [proceessFeed, setFeed] = useState([""]);
  const [authState, setAuthState] = useContext(AuthContext);

  let errorOccured = false;

  let handleSubmit = (event) => {
    submitStory();
    event.preventDefault();
  };

  let submitStory = () => {
    let requestBody = {
      title: storyTitle,
      story: storyContent,
    };
    fetch("http://localhost:5000/stories/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          errorOccured = true;
        }

        return response.json();
      })
      .then((data) => {
        if (errorOccured === false && data.results === "true") {
          setFeed(<>Your story was submitted successful!</>);
        } else {
          setFeed(data.error);
        }
      });
  };

  return (
    <>
      <header class="articleHeader" id="p1">
        New Submission
      </header>
      <p>
        <div className="loginError">{proceessFeed}</div>{" "}
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <br />
            <input
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            Content
            <br />
            <textarea
              name="story_content"
              lol
              cols="100"
              rows="20"
              onChange={(e) => setStory(e.target.value)}
            ></textarea>
          </label>
          <br />
          <input value="Submit Story" type="submit" />
        </form>
      </p>
    </>
  );
}
