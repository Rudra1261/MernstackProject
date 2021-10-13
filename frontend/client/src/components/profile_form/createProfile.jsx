import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { createProfile } from '../../actions/profile'
import { connect } from 'react-redux'
import PersonIcon from '@mui/icons-material/Person';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const CreateProfile = ({ history, createProfile }) => {
    const [isDisplay, setIsDisplay] = useState(false) // toggles the display of socials using a button
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        bio: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        youtube: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: ''
    })
    let {
        company,
        website,
        location,
        bio,
        status,
        skills,
        githubusername,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
    } = formData
    // skills = skills.toString()
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: [e.target.value].toString() })

    }
    const onSubmit = e => {
        e.preventDefault()
        formData.skills = formData.skills.split(',').map(e => e.trim())
        // formData.status = formData.status.toString()

        console.log(formData)
        createProfile(formData, history, false)
    }
    return (
        <>
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <PersonIcon /> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={(e) => onChange(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text"
                    >Give us an idea of where you are at in your career</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={(e) => onChange(e)} />
                    <small className="form-text"
                    >Could be your own company or one you work for</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={(e) => onChange(e)} />
                    <small className="form-text"
                    >Could be your own or a company website</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={(e) => onChange(e)} />
                    <small className="form-text"
                    >City & state suggested (eg. Boston, MA)</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={(e) => onChange(e)} />
                    <small className="form-text"
                    >Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername} onChange={(e) => onChange(e)}
                    />
                    <small className="form-text"
                    >If you want your latest repos and a Github link, include your
                        username</small
                    >
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={(e) => onChange(e)}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button type="button" onClick={() => setIsDisplay(!isDisplay)} className="btn btn-light">
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>
                {isDisplay && <><div className="form-group social-input">
                    <TwitterIcon />
                    <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={(e) => onChange(e)} />
                </div>

                    <div className="form-group social-input">
                        <FacebookIcon />
                        <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={(e) => onChange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <YouTubeIcon />
                        <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={(e) => onChange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <LinkedInIcon />
                        <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={(e) => onChange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <InstagramIcon />
                        <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={(e) => onChange(e)} />
                    </div>
                </>}
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
}

export default connect(null, { createProfile })(withRouter(CreateProfile))
