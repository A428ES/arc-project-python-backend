import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/user_context";
import AddComment from "./add_comment";

export default function CommentsOnStory(prop) {
  const [authState, setAuthState] = useContext(AuthContext);
  const [submissions, setSubmissions] = useState(0);

  const getComments = () => {
    fetch("http://localhost:5000/comments/display?id=" + prop.storyID, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setSubmissions(data);
      });
  };

  useEffect(() => {
    getComments();
    prop.setNew(false);
  }, [prop.newComment]);

  return (
    <>
      <p>
        <section>
          {submissions.results
            ? submissions.results.map((item) => (
                <>
                  <section>
                    {" "}
                    <header className="articleHeader" id="p1">
                      {item.author} said the following on {item.date}
                    </header>
                    <p class="article">{item.content}</p>
                  </section>
                </>
              ))
            : "No comments to view"}

          {authState.userLoggedIn === true ? (
            <AddComment storyID={prop.storyID} setNew={prop.setNew} />
          ) : (
            <>Log in to comment</>
          )}
        </section>
      </p>
    </>
  );
}
