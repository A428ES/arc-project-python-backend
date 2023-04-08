import React, { useState, useEffect } from "react";
import HTTPRequester from "../../utility/requester";

export default function AddSubmission() {
  const [storyContent, setStory] = useState([]);
  const [storyTitle, setTitle] = useState([]);
  const [proceessFeed, setFeed] = useState([""]);
  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();

  useEffect(() => {
    if (dataFeed !== null && errorFeed === null) {
      setFeed(<>Your story was submitted successful!</>);
    } else if (errorFeed !== null) {
      setFeed(errorFeed);
    }
  }, [dataFeed]);

  let handleSubmit = (event) => {
    getData("stories/submit", "POST", {
      title: storyTitle,
      story: storyContent,
    });
    event.preventDefault();
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
