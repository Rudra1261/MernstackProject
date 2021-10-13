import React from 'react'
import PropTypes from 'prop-types'
import LanguageIcon from '@mui/icons-material/Language';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const ProfileTop = ({ profile: { status, company, location, website, social, user: { name, avatar } } }) => {
    return (
        <>
            {/* <!-- Top --> */}
            <div className="profile-top bg-primary p-2">
                <img
                    className="round-img my-1"
                    src={avatar}
                    alt=""
                />
                <h1 className="large">{name}</h1>
                <p className="lead">{status} {company && <span> at {company}</span>}</p>
                <p>{location && <span>{location}</span>}</p>
                <div className="icons my-1">
                    {website &&
                        (
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                <LanguageIcon />
                            </a>
                        )}

                    {social && social.twitter && (<a href={social.twitter} target="_blank" rel="noopener noreferrer">
                        <TwitterIcon />
                    </a>)}
                    {social && social.facebook && (<a href={social.facebook} target="_blank" rel="noopener noreferrer">
                        <FacebookIcon />
                    </a>)}
                    {social && social.linkedin && (<a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon />
                    </a>)}
                    {social && social.youtube && (<a href={social.youtube} target="_blank" rel="noopener noreferrer">
                        <YouTubeIcon />
                    </a>)}
                    {social && social.instagram && (<a href="#" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon />
                    </a>)}
                </div>
            </div>


        </>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}
export default ProfileTop
