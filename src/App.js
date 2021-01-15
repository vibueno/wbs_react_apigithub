/*
This file contains an API request to Github with both fetch and exios.
Comment/uncomment the appropriate lines to wotk with one method or the other
 */

import React, { useEffect, useState } from "react";
import "./App.css";
import List from "./components/List";
import withListLoading from "./components/withListLoading";

//axios
import axios from "axios";

function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: true,
    repos: null,
  });

  //fetch

  /*
  const errorHandler = (response) => {
    if (!response.ok) throw Error(response.statusText);
    else return response;
  };

  useEffect(() => {
    const apiUrl = "https://api.github.com/users/vibueno/repos";
    fetch(apiUrl, {
      headers: { authorization: process.env.REACT_APP_GIT_PERSONAL_TOKEN },
    })
      .then(errorHandler)
      .then((response) => response.json())
      .then((repos) => {
        setAppState({ loading: false, repos: repos });
      })
      .catch((error) => throw Error(error.message));
  }, [appState.loading]);
  */

  //axios

  const headers = {
    authorization: process.env.REACT_APP_GIT_PERSONAL_TOKEN,
  };

  useEffect(() => {
    const apiUrl = "https://api.github.com/users/vibueno/repos";
    axios.get(apiUrl, headers).then((repos) => {
      const allRepos = repos.data;
      setAppState({ loading: false, repos: allRepos });
    });
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
