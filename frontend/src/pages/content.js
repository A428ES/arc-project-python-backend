import React, { useEffect } from "react";
import { useState } from "react";
import CommentBar from "../components/comment_bar";
import HTTPRequester from "../utility/requester";

export default function Content(prop) {
  const [submissions, setSubmissions] = useState("Loading stories...");
  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();

  useEffect(() => {
    if (dataFeed === null) {
      getData();
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
        {submissions && submissions.results
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
