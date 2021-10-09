import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
const Navbar = ({ logout, auth }) => {
    const { loading, isAuthenticated } = auth

    const guestLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    const authLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/posts">Posts</Link></li>

            <li>
            <Link to='/dashboard' >
                    <i className = "fas fa-user"/>{' '}
                    <span className = 'hide-sm'> Dashboard</span>
                </Link>
                <Link onClick = {logout} to='/' >
                    <i className = "fas fa-sign-out-alt"/>{' '}
                    <span className = 'hide-sm'> Logout</span>
                </Link>
            </li>
        </ul>
    )

    return (
        <>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
                </h1>
                <>{!loading && (isAuthenticated ? authLinks : guestLinks)}</>

            </nav>
        </>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
}
const mapStatesToProp = state => ({
    auth: state.auth
})

export default connect(mapStatesToProp, { logout })(Navbar)
