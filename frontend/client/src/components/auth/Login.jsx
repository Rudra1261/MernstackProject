import React, { useState } from 'react'
import { Link,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import PropTypes from 'prop-types'
import PersonIcon from '@mui/icons-material/Person';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData
    const change = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const submit = async e => {
        e.preventDefault();
        login(email, password)
    }
    if (isAuthenticated) return <Redirect to ='/dashboard'/>

    return (
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <PersonIcon/>
                 Sign into Your Account</p>
            <form className="form" onSubmit={e => submit(e)}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email}
                        onChange={e => change(e)} required />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={e => change(e)}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>

        </>
    )
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStatesToProp = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStatesToProp, {login})(Login)