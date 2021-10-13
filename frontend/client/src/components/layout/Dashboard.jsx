import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import PersonIcon from '@mui/icons-material/Person';
import { deleteAccount, getCurrentProfile } from '../../actions/profile'
const Dashboard = ({ getCurrentProfile,deleteAccount, auth: { isAuthenticated, loading, user }, profile: { profile } }) => {

    useEffect(() => {
        getCurrentProfile()
    }, [])



    return loading && profile === null ? <Spinner /> : <>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <PersonIcon/>
            Welcome {user && user.name}
        </p>
        {profile !== null ? <> <DashboardActions />
        <Experience experience={profile.experience}/>
        <Education education={profile.education}/>
        <div className="my-2">
            <button className="btn btn-danger" onClick={()=> deleteAccount(user.id)}>Delete My account</button>
        </div>
        </> : <>
            <p>You don't have a profile yet, please create one</p>
            <Link to='/create-profile' className='btn btn-primary'>Create Profile</Link>
        </>}
    </>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStatesToProp = state => ({
    auth: state.auth,
    profile: state.profile,
    deleteAccount:PropTypes.func.isRequired,

})

export default connect(mapStatesToProp, { getCurrentProfile, deleteAccount })(Dashboard)
