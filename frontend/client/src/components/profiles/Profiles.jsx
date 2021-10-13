import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'


const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles()
    }, [])
    return (
        <>
            {loading ? <Spinner /> : <>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    Browse and Connect with developers

                </p>
                <div className="profiles">
                    {profiles.length > 0 ?
                        profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile} />
                        ))
                        : <h4>There are no profiles currently</h4>}
                </div>
            </>}
        </>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStatesToProps = state => ({
    profile: state.profile
})

export default connect(mapStatesToProps, { getProfiles })(Profiles)
