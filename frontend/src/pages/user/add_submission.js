import React, { useState, useEffect } from "react";
import HTTPRequester from "../../utility/requester";
import PageTitle from "../../components/page_title";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function AddSubmission() {
  const [storyContent, setStory] = useState([]);
  const [storyTitle, setTitle] = useState([]);
  const [proceessFeed, setFeed] = useState([""]);
  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (newState) => {
    setEditorState(newState);
    setStory(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  useEffect(() => {
    if (dataFeed !== null && errorFeed === null) {
      setFeed(<>Your story was submitted successful!</>);
    } else if (errorFeed !== null) {
      setFeed(errorFeed);
    }
  }, [dataFeed]);

  let handleSubmit = (event) => {
    getData("stories/submit", "POST", {
      title: storyTitle,
      story: storyContent,
    });
    event.preventDefault();
  };

  return (
    <>
      <PageTitle text="Submit New Story" />
      <div className="loginError">{proceessFeed}</div>{" "}
      <section>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <br />
            <input
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            Content
            <br />
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onChange}
            />
          </label>
          <br />
          <input value="Submit Story" type="submit" />
        </form>
      </section>
    </>
  );
}
