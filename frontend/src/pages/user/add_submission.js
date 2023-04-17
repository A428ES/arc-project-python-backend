import React, { useState, useEffect } from "react";
import HTTPRequester from "../../utility/requester";
import PageTitle from "../../components/page_title";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function AddSubmission() {
  const navigate = useNavigate();
  const [storyContent, setStory] = useState("");
  const [storyTitle, setTitle] = useState("Enter Your Title Here");
  const [proceessFeed, setFeed] = useState([""]);
  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML("<h3>Enter your story here</h3>")
      )
    )
  );

  const onChange = (newState) => {
    setEditorState(newState);
    setStory(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  useEffect(() => {
    if (dataFeed !== null && errorFeed === null) {
      confirmAlert({
        title: "Submitted Successfully",
        message: "Click Okay to view your submissions",
        buttons: [
          {
            label: "Okay",
            onClick: () => navigate("/mysubmissions"),
          },
        ],
      });
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
            <input
              type="text"
              name="title"
              size="30"
              value={storyTitle}
              onClick={(e) =>
                e.target.value === "Enter Your Title Here" ? setTitle("") : ""
              }
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
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
