import React from "react";
import { useState, useEffect } from "react";
import HTTPRequester from "../../utility/requester";

export default function AddComment(prop) {
  const [outComeFeed, setFeed] = useState([""]);
  const [commentData, setComment] = useState("");
  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();

  useEffect(() => {
    if (dataFeed !== null && errorFeed === null) {
      prop.setNew(true);
      setFeed(<>Your comment was submitted successful!</>);
      setComment("");
    } else if (errorFeed !== null) {
      setFeed(errorFeed);
    }
  }, [dataFeed]);

  let handleSubmit = (event) => {
    getData("comments/submit", "POST", {
      comment: commentData,
      story: prop.storyID,
    });
    event.preventDefault();
  };

  return (
    <>
      <header class="articleHeader" id="p1">
        Add Comment
      </header>
      <p>
        <div class="content">
          <div class="loginError">{outComeFeed}</div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={commentData}
              name="comment"
              rows="10"
              cols="70"
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <input value="Submit Comment" type="submit" />
          </form>
        </div>
      </p>
    </>
  );
}
