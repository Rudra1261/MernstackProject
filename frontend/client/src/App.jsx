import "./App.css";
import React, { useEffect } from "react";
import {
  Navbar, Landing, Routes
} from "./components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/privateRoute";
// Redux

import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
if (localStorage.token) setAuthToken(localStorage.token)

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes}/>
          </Switch>


        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
