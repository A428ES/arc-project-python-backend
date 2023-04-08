import { useEffect, useState } from "react";
import CommentsOnStory from "../pages/user/storycomments";
import HTTPRequester from "../utility/requester";

export default function CommentBar(prop) {
  const [commentTotal, setCommentTotal] = useState(0);
  const [viewingComment, setView] = useState(false);
  const [newComment, setNewComment] = useState();
  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();

  useEffect(() => {
    if (dataFeed === null || newComment === true) {
      getData(`comments/count?id=${prop.storyID}`, "GET");
      setNewComment(false);
    } else {
      setCommentTotal(dataFeed.results);
    }
  }, [dataFeed, newComment]);

  let movePage = () => {
    setView(true);
  };

  return (
    <>
      {viewingComment === false ? (
        <header className="articleHeader" id="p2">
          <a href="#" onClick={() => movePage()}>
            comments ({commentTotal})
          </a>
        </header>
      ) : (
        <>
          <header className="articleHeader" id="p2">
            <a href="#" onClick={() => setView(false)}>
              Close {commentTotal} comments
            </a>
          </header>
          <CommentsOnStory
            viewType="comments/display"
            storyID={prop.storyID}
            setNew={setNewComment}
            newComment={newComment}
          />
        </>
      )}
    </>
  );
}
