import { useEffect, useState, useContext } from "react";
import CommentDisplay from "./comment_display";
import HTTPRequester from "../utility/requester";
import { AuthContext } from "../context/user_context";

export default function CommentDropDown(prop) {
  const [authState, setAuthState] = useContext(AuthContext);
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
          <a href="javascript:void(0)" onClick={() => movePage()}>
            comments ({commentTotal})
          </a>
        </header>
      ) : (
        <>
          <header className="articleHeader" id="p2">
            <a href="javascript:void(0)" onClick={() => setView(false)}>
              Close {commentTotal} comments
            </a>
          </header>
          <CommentDisplay
            viewType="comments/display"
            storyID={prop.storyID}
            setNew={setNewComment}
            newComment={newComment}
            authorUUID={
              authState.userData ? authState.userData.uuid : undefined
            }
          />
        </>
      )}
    </>
  );
}
