import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/user_context";

export default function AddComment(prop) {
  const [outComeFeed, setFeed] = useState([""]);
  const [commentData, setComment] = useState("");
  const [authState, setAuthState] = useContext(AuthContext);

  let errorOccured = false;

  let handleSubmit = (event) => {
    submitComment();
    event.preventDefault();
  };

  let submitComment = () => {
    let requestBody = {
      comment: commentData,
      story: prop.storyID,
    };
    fetch("http://localhost:5000/comments/submit", {
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
          prop.setNew(true);
          setComment("");
          setFeed(<>Your comment was submitted successful!</>);
        } else {
          setFeed(data.error);
        }
      });
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
