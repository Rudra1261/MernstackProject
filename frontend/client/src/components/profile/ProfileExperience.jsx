import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

const ProfileExperience = ({exp:{
    company, title, location, current, to, from, description
}}) => {
    return (
        <>
          <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          <div>
            <h3 className="text-dark">{company}</h3>
            <p><Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}</p>
            <p><strong>Position: </strong>{title}</p>
            <p>
              <strong>Description: </strong>{description}
            </p>
          </div>
          
        </div>  
        </>
    )
}

ProfileExperience.propTypes = {
    exp : PropTypes.object.isRequired,
}

export default ProfileExperience
