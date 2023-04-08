import React, { useEffect } from "react";
import { useState } from "react";
import CommentBar from "../components/comment_bar";
import StoryViewer from "../components/story_viewer";
import HTTPRequester from "../utility/requester";

export default function Story(prop) {
  return <StoryViewer author="/" />;
}
