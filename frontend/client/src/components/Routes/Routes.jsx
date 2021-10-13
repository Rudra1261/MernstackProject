import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Register, Login, Alert, Dashboard, CreateProfile,
    EditProfile, AddEducation, AddExperience, Profiles, Profile, Posts, Post } from '..'
    import PrivateRoute from '../routing/privateRoute'
const Routes = () => {
    return (
        <>
            <section className="container">
                <Alert />
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path='/profiles' component={Profiles} />
                    <Route exact path='/profile/:id' component={Profile} />
                    <PrivateRoute exact path='/post/:id' component={Post} />
                    <PrivateRoute exact path='/dashboard' component={Dashboard} />
                    <PrivateRoute exact path='/create-profile' component={CreateProfile} />
                    <PrivateRoute exact path='/edit-profile' component={EditProfile} />
                    <PrivateRoute exact path='/add-experience' component={AddExperience} />
                    <PrivateRoute exact path='/add-education' component={AddEducation} />
                    <PrivateRoute exact path='/post' component={Posts} />

                </Switch>
            </section>
        </>
    )
}

export default Routes
