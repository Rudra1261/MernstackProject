import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPosts } from '../../actions/post'
import PostItem from './PostItem'
import PostForms from './PostForms'

const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts()
    }, [getPosts])
    return (
        <>
            {loading ? <Spinner /> : <>
                <h1 className="large text-primary">Posts</h1>
                <p className="lead">
                    Welcome to the community
                </p>
                <PostForms />

                <div className="posts">

                    {!posts ? <h1>No posts yet</h1> : posts.map(post => (
                        <PostItem key={post._id} post={post} />
                    ))}

                </div>
            </>}
        </>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStatesToProp = state => ({
    post: state.post
})

export default connect(mapStatesToProp, { getPosts })(Posts)
