import React, { useEffect } from "react";
import { useState } from "react";
import CommentBar from "../components/comment_bar";
import HTTPRequester from "../utility/requester";
import PageTitle from "./page_title";

export default function StoryViewer(prop) {
  const [submissions, setSubmissions] = useState("Loading stories...");
  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();

  useEffect(() => {
    if (dataFeed === null) {
      getData(prop.author);
    } else {
      setSubmissions(dataFeed);
    }
  }, [dataFeed]);

  return (
    <>
      <PageTitle text="Viewing Stories" />
      <section>
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
      </section>
    </>
  );
}
