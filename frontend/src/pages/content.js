import React, { useEffect } from "react";
import { AuthContext } from "../context/user_context";
import { useContext, useState } from "react";
import CommentBar from "../components/comment_bar";

export default function Content(prop) {
  const [submissions, setSubmissions] = useState("Loading stories...");

  const getSubmissions = () => {
    fetch("http://localhost:5000/", { method: "GET" })
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
