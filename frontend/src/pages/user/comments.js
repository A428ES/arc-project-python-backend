import React, { useContext } from "react";
import CommentsOnStory from "./storycomments";
import { AuthContext } from "../../context/user_context";
import PageTitle from "../../components/page_title";

export default function MyComments() {
  const [authState, setAuthState] = useContext(AuthContext);

  return (
    <>
      <PageTitle text="Viewing Your Comments" />
      <CommentsOnStory
        viewType="comments/mycomments"
        storyID={null}
        setNew={() => {}}
        newComment={null}
      />
    </>
  );
}
