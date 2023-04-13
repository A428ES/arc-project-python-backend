import React, { useContext } from "react";
import CommentDisplay from "../../components/comment_display";
import { AuthContext } from "../../context/user_context";
import PageTitle from "../../components/page_title";

export default function MyComments() {
  const [authState, setAuthState] = useContext(AuthContext);

  return (
    <>
      <PageTitle text="Viewing Your Comments" />
      <CommentDisplay
        viewType="comments/mycomments"
        storyID={null}
        setNew={() => {}}
        newComment={null}
      />
    </>
  );
}
