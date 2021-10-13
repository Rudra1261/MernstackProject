import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

const ProfileEducation = ({ed:{
    school, degree, fieldofstudy, current, to, from, description
}}) => {
    return (
        <>
          <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Eduaction</h2>
          <div>
            <h3 className="text-dark">School: {school}</h3>
           


            <p><Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}</p>
            <p><strong>Degree: </strong>{degree}</p>
            <p><strong>Field of Study: </strong>{fieldofstudy}</p>

            <p>
              <strong>Description: </strong>{description}
            </p>
          </div>
          
        </div>  
        </>
    )
}

ProfileEducation.propTypes = {
    ed : PropTypes.object.isRequired,
}

export default ProfileEducation
