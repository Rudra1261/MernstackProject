import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addLike, removeLike } from '../../actions/post'

const PostItem = ({ post: { _id, text, name, user, avatar, likes, comment, date }, auth, addLike, removeLike }) => {
    return (
        <>
            <div className="post bg-white p-1 my-1">
                <div>
                    <a href="profile.html">
                        <img
                            className="round-img"
                            src={avatar}
                            alt="" />
                        <h4>{name}</h4>
                    </a>
                </div>
                <div>
                    <p className="my-1">
                        {text}
                    </p>
                    <p className="post-date">
                        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                    </p>
                    <button onClick={()=>addLike(_id)} type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-up"></i>
                        {likes.length > 0 && <span>{likes.length}</span>}

                    </button>
                    <button type="button" onClick={()=>removeLike(_id)} className="btn btn-light">
                        <i className="fas fa-thumbs-down"></i>
                    </button>
                    <Link to={`/post/${_id}`} className="btn btn-primary">
                        Discussion
                        {comment.length > 0 && <span className='comment-count'>{comment.length}</span>
                        }</Link>
                    {!auth.laoding && user == auth.user._id &&
                        <button
                            type="button"
                            className="btn btn-danger">
                            <i className="fas fa-times"></i>
                        </button>}
                </div>

            </div></>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
}

const mapStatesToProp = state => ({
    auth: state.auth
})
export default connect(mapStatesToProp, { addLike, removeLike })(PostItem)
