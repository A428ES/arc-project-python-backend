import React, { useState, useEffect } from "react";
import HTTPRequester from "../../utility/requester";
import PageTitle from "../../components/page_title";
import TextareaAutosize from "react-textarea-autosize";

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
      <PageTitle text="Submit New Story" />
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
          <TextareaAutosize
            minRows={15}
            maxRows={25}
            cols={60}
            minCols="20"
            autoFocus
          />
          {/* <textarea
            style="overflow: hidden;"
            name="story_content"
            lol
            cols="100"
            rows="20"
            onChange={(e) => setStory(e.target.value)}
          ></textarea> */}
        </label>
        <br />
        <input value="Submit Story" type="submit" />
      </form>
    </>
  );
}
