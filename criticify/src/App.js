import React from "react";
// import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthCallback from "./Pages/callback";
import SigninPage from "./Pages/signin";
import MainPage from "./Pages/main";
import Player from "./components/Player/player";

function App() {
  return (
    <>
      <Player />
      <Router>
        <Switch>
          <Route path="/callback/">
            <AuthCallback />
          </Route>
          <Route path="/auth">
            <MainPage />
          </Route>
          <Route path="/">
            <SigninPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
