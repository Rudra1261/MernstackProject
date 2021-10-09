import "./App.css";
import React, { useEffect } from "react";
import {
  Navbar, Landing, Register, Login, Alert, Dashboard, CreateProfile,
  EditProfile, AddEducation, AddExperience, Profiles, Profile, Posts
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
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path = '/profiles' component = {Profiles}/>
              <Route exact path = '/profile/:id' component = {Profile}/>
              
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              <PrivateRoute exact path='/edit-profile' component={EditProfile} />
              <PrivateRoute exact path='/add-experience' component={AddExperience} />
              <PrivateRoute exact path='/add-education' component={AddEducation} />
              <PrivateRoute exact path='/posts' component={Posts} />

            </Switch>
          </section>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
