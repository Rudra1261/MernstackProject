import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'
import PersonIcon from '@mui/icons-material/Person';
const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formData
    const change = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const submit = async e => {
        e.preventDefault();
        if (password !== password2) setAlert("Passwords don't match", "danger", 3000)
        else {
            register({ name, email, password })
        }
    }
    if (isAuthenticated) return <Redirect to='/dashboard' />
    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><PersonIcon/> Create Your Account</p>
            <form className="form" onSubmit={e => submit(e)} action="create-profile.html">
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name}
                        onChange={e => change(e)}
                    // required
                    />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email}
                        onChange={e => change(e)}
                    // required
                    />
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        // minLength="6"
                        value={password}
                        onChange={e => change(e)}
                    // required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={e => change(e)}
                    // minLength="6"
                    // required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>

        </>
    )
}



Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}
const mapStatesToProp = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStatesToProp, { setAlert, register })(Register)
