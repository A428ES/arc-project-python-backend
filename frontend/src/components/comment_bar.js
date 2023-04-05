import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/user_context";
import AddComment from "../pages/user/add_comment";
import CommentsOnStory from "../pages/user/storycomments";

export default function CommentBar(prop) {
  const [authState, setAuthState] = useContext(AuthContext);
  const [commentTotal, setCommentTotal] = useState(0);
  const [viewingComment, setView] = useState(false);
  const [newComment, setNewComment] = useState();
  const navigate = useNavigate();

  const getComments = () => {
    fetch("http://localhost:5000/comments/count?id=" + prop.storyID, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setCommentTotal(data.results);
      });
  };

  useEffect(() => {
    getComments();
  }, [newComment]);

  let movePage = () => {
    setView(true);
  };

  return (
    <>
      {viewingComment === false ? (
        <header className="articleHeader" id="p1">
          <a href="#" onClick={() => movePage()}>
            comments ({commentTotal})
          </a>
        </header>
      ) : (
        <>
          <header className="articleHeader" id="p1">
            <a href="#" onClick={() => setView(false)}>
              Close {commentTotal} comments
            </a>
          </header>
          <CommentsOnStory
            storyID={prop.storyID}
            setNew={setNewComment}
            newComment={newComment}
          />
        </>
      )}
    </>
  );
}
