import React, { useContext, useEffect, useState } from "react";
import CommentDisplay from "../../components/comment_display";
import { AuthContext } from "../../context/user_context";
import PageTitle from "../../components/page_title";
import HTTPRequester from "../../utility/requester";

export default function MyComments() {
  const [newComment, setNewComment] = useState();
  
  return (
    <>
      <PageTitle text="Viewing Your Comments" />
      <CommentDisplay
        viewType="comments/mycomments"
        storyID={null}
        setNew={setNewComment}
        newComment={newComment}
      />
    </>
  );
}
