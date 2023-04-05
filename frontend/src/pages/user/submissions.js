import React from "react";
import { useState, useEffect } from "react";
import CommentBar from "../../components/comment_bar";

export default function MySubmissions() {
  const [submissions, setSubmissions] = useState("Loading stories...");
  const getSubmissions = () => {
    fetch("http://localhost:5000/stories/mystories", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setSubmissions(data);
      });
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  return (
    <>
      <header className="articleHeader" id="p1">
        Story Feed
      </header>
      <p>
        {submissions.results
          ? submissions.results.map((item) => (
              <>
                <section>
                  {" "}
                  <header className="articleHeader" id="p1">
                    {item.title} by {item.author} on {item.date}
                  </header>
                  <p class="article">{item.story}</p>
                  <CommentBar storyID={item.uuid} />
                </section>
              </>
            ))
          : "No results"}
      </p>
    </>
  );
}
