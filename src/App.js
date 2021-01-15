import React, { useEffect, useState } from "react";
import "./App.css";
import List from "./components/List";
import withListLoading from "./components/withListLoading";
function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: true,
    repos: null,
  });

  const handleErrors = (response) => {
    if (!response.ok) throw Error(response.statusText);
    else return response;
  };

  useEffect(() => {
    const apiUrl = `https://api.github.com/users/vibueno/repos`;
    fetch(apiUrl, {
      headers: { authorization: process.env.REACT_APP_GIT_PERSONAL_TOKEN },
    })
      .then(handleErrors)
      .then((response) => response.json())
      .then((repos) => {
        setAppState({ loading: false, repos: repos });
      })
      .catch((error) => throw Error(error));
  }, [appState.loading]);

  return (
    <div className="App">
      <div className="container">
        <h1>My Repositories</h1>
      </div>
      <div className="repo-container">
        <ListLoading isLoading={appState.loading} repos={appState.repos} />
      </div>
      <footer>
        <div className="footer">
          Built{" "}
          <span role="img" aria-label="love">
            💚
          </span>{" "}
          with by Shedrack Akintayo
        </div>
      </footer>
    </div>
  );
}
export default App;
