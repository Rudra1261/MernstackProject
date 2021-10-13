import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteComment } from '../../actions/post'
import Moment from 'react-moment'
const CommentItem = ({ postid, auth, comment: { _id, avatar, name, user, date, text } }) => {
    return (
        <>
            <div class="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                        <img
                            class="round-img"
                            src={avatar}
                            alt=""
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p class="my-1">
                        {text}
                    </p>
                    <p class="post-date">
                        <Moment format='YYYY/MM/DD'>{date}</Moment>
                    </p>{!auth.loading && user === auth.user._id &&
                        <button className="btn btn-danger" onClick={() => deleteComment(postid,_id)}></button>
                    }
                </div>
            </div>
        </>
    )
}

const mapStatesToProp = state => ({
    auth: state.auth
})

export default connect(mapStatesToProp, { deleteComment })(CommentItem)
