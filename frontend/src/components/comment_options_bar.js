import { useEffect, useState } from "react";
import HTTPRequester from "../utility/requester";

export default function CommentOptonsBar(prop) {
  let deleteView = (
    <header className="articleHeader" id="p1">
      <a href="javascript:void(0)" onClick={() => handleSubmit()}>
        Delete Comment
      </a>
    </header>
  );
  const [outComeFeed, setFeed] = useState([""]);

  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();
  const [deleteCommentView, delCommentUpdate] = useState(deleteView);

  useEffect(() => {
    if (dataFeed !== null && errorFeed === null) {
      prop.setNew(true);
      delCommentUpdate("");
    } else if (errorFeed !== null) {
      setFeed(errorFeed);
    }
  }, [dataFeed]);

  let handleDelete = () => {
    getData("comments/delete", "POST", { uuid: prop.commentUUID });
  };

  let handleSubmit = () => {
    delCommentUpdate(
      <section>
        Are you sure you want to delete your comment?{" "}
        <a href="javascript:void(0)" onClick={() => handleDelete()}>
          Yes
        </a>{" "}
        |{" "}
        <a
          href="javascript:void(0)"
          onClick={() => delCommentUpdate(deleteView)}
        >
          No
        </a>
      </section>
    );
  };
  return <>{deleteCommentView}</>;
}
