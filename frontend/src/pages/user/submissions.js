import React from "react";
import { useState, useEffect } from "react";
import CommentBar from "../../components/comment_bar";
import HTTPRequester from "../../utility/requester";

export default function MySubmissions() {
  const [submissions, setSubmissions] = useState("Loading stories...");
  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();

  useEffect(() => {
    if (dataFeed === null) {
      getData("stories/mystories", "GET");
    } else {
      setSubmissions(dataFeed);
    }
  }, [dataFeed]);
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
