import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPost } from '../../actions/post'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
const Post = ({ getPost, post: { post, loading }, match }) => {

    useEffect(() => {
        getPost(match.params.id)
    }, [getPost])
    return (
        <>
            {loading || post == null ? <Spinner /> : <>
                <PostItem post={post} showActions={false} />
                <CommentForm postid = {post._id}/>
                <div className="comments">
                    {post.comments.map(comment => (
                        <CommentItem key={comment._id} postid = {post._id} comment = {comment} />
                    ))}
                </div>
            </>}
        </>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStatesToProp = state => ({
    post: state.post
})

export default connect(mapStatesToProp, { getPost })(Post)
