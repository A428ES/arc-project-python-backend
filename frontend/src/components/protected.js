import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return (
      <>
        <header class="articleHeader" id="p1">
          Login Required
        </header>
        <p>You need to be logged in to view this page</p>
      </>
    );
  }
  return children;
};
export default Protected;
