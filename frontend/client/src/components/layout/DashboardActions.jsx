import React from 'react'
import { Link } from 'react-router-dom'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddIcon from '@mui/icons-material/Add';
const DashboardActions = () => {
    return (
        <>
            <div className="dash-buttons">
                <Link to="/edit-profile" className="btn btn-light">
                    <PersonOutlineIcon/> Edit Profile</Link>
                <Link to="/add-experience" className="btn btn-light">
                    <AddIcon/> Add Experience</Link>
                <Link to="/add-education" className="btn btn-light">
                    <AddIcon/> Add Education</Link>
            </div>
        </>
    )
}

export default DashboardActions
