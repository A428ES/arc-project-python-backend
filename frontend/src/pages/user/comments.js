import React from "react";
import CommentsOnStory from "./storycomments";

export default function MyComments() {
  return (
    <>
      <CommentsOnStory
        viewType="comments/mycomments"
        storyID={null}
        setNew={() => {}}
        newComment={null}
      />
    </>
  );
}
