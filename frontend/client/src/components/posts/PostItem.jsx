import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addLike, removeLike, deletePost } from '../../actions/post'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const PostItem = ({ showActions = true, deletePost, post: { _id, text, name, user, avatar, likes, comment, date }, auth, addLike, removeLike }) => {
    return (
        <>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                        <img
                            className="round-img"
                            src={avatar}
                            alt="" />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                        {text}
                    </p>
                    <p className="post-date">
                        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                    </p>

                    {showActions && <>
                        {_id && 
                        <button onClick={() => addLike(_id)} type="button" className="btn btn-light">
                            <ThumbUpIcon />
                            {likes.length > 0 && <span>{likes.length}</span>}

                        </button>}
                        {_id && 
                         <button type="button" onClick={() => removeLike(_id)} className="btn btn-light">
                            <ThumbDownIcon />
                        </button>}

                        {_id &&
                            <Link to={`/post/${_id}`} className="btn btn-primary">
                                Discussion
                                {comment && (comment.length > 0) &&
                                    <span className='comment-count'>
                                        {comment.length}</span>}

                            </Link>
                        }

                       
                        {/* {_id ?
                            (auth.user._id && !auth.loading && user === auth.user._id && (
                                <>
                                    <button onClick={() => deletePost(_id)} className="btn btn-danger">
                                        <DeleteForeverIcon />
                                    </button>
                                </>
                            ))
                            : null} */}



                    </>}

                </div>

            </div></>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStatesToProp = state => ({
    auth: state.auth
})
export default connect(mapStatesToProp, { addLike, removeLike, deletePost })(PostItem)
