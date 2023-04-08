import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/user_context";
import AddComment from "./add_comment";
import HTTPRequester from "../../utility/requester";

export default function CommentsOnStory(prop) {
  const [authState, setAuthState] = useContext(AuthContext);
  const [submissions, setSubmissions] = useState(0);
  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();

  useEffect(() => {
    if (dataFeed === null || prop.newComment === true) {
      getData(prop.viewType, "POST", {
        story_id: prop.storyID,
      });
      prop.setNew(false);
    } else {
      setSubmissions(dataFeed);
    }
  }, [dataFeed, prop.newComment]);

  let postCommentView = () => {
    if (prop.viewType !== "comments/mycomments") {
      if (authState.userLoggedIn === true) {
        return <AddComment storyID={prop.storyID} setNew={prop.setNew} />;
      } else {
        return "Please log in to comment.";
      }
    }
  };

  return (
    <>
      <p>
        <section>
          {submissions.results ? (
            submissions.results.map((item) => (
              <>
                <section>
                  {" "}
                  <header className="articleHeader" id="p1">
                    {item.author} said the following on {item.date}
                  </header>
                  <p class="article">{item.content}</p>
                </section>
              </>
            ))
          ) : (
            <p class="article">No comments to view</p>
          )}

          {postCommentView()}
        </section>
      </p>
    </>
  );
}
