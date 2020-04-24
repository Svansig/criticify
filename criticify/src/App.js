import React from "react";
// import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthCallback from "./Pages/callback";
import SigninPage from "./Pages/signin";
import MainPage from "./Pages/main";
import Navigation from "./components/Navbar/navbar";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Navigation />
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
    </Provider>
  );
}

export default App;
