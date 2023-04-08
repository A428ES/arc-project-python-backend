import React from "react";
import { useState, useEffect } from "react";
import CommentBar from "../../components/comment_bar";
import HTTPRequester from "../../utility/requester";
import StoryViewer from "../../components/story_viewer";

export default function MySubmissions() {
  return <StoryViewer author="stories/mystories" />;
}
