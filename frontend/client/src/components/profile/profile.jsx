import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profile'
import { Link } from 'react-router-dom'
import { ProfileAbout } from './ProfileAbout'
import  ProfileEducation  from './ProfileEducation'
import ProfileGithub from './profileGithub'

import ProfileExperience from './ProfileExperience'
const Profile = ({ match, getProfileById, profile: { profile    , loading }, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById])
    return (
        <>
            {(profile === null || loading) ? <Spinner /> : <>
                <Link to='/profiles' className='btn btn-light'>
                    Back to profiles
                </Link>
                {auth.isAuthenticated && loading === false && auth.user._id === profile.user._id && <Link 
                to='/edit-profile' className='btn btn-dark'>Edit profile
                </Link>}
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile}/>
                    <ProfileAbout profile = {profile}/>
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {profile.experience.length > 0 ?
                        (<>
                        {profile.experience.map(exp => (
                            <ProfileExperience key = {exp._id}  exp= {exp}/>
                        ))}
                        </>) : (<h4>No experience credentials</h4>)}
                    </div><br/>
                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {profile.education.length > 0 ?
                        (<>
                        {profile.education.map(ed => (
                            <ProfileEducation key = {ed._id}  ed= {ed}/>
                        ))}
                        </>) : (<h4>No education credentials</h4>)}
                    </div>
                    {profile.githubusername && <ProfileGithub username={profile.githubusername}/>}
                </div>
            </>}
        </>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStatesToProp = state => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStatesToProp, { getProfileById })(Profile)
