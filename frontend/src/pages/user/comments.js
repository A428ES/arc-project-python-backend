import React from "react";
import CommentsOnStory from "./storycomments";
import PageTitle from "../../components/page_title";

export default function MyComments() {
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
