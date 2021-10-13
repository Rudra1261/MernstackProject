import React, { useState } from 'react'
import { addComment } from '../../actions/post'
import { connect } from 'react-redux'
const CommentForm = ({ postid, addComment }) => {
    const [text, setText] = useState(' ')
    return (
        <>
            <div class="post-form">
                <div class="bg-primary p">
                    <h3>Leave A Comment</h3>
                </div>
                <form class="form my-1" onSubmit={e => {
                    e.preventDefault()
                    addComment(postid,{ text })
                    setText('')
                }}>
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Comment on this post"
                        required value={text} onChange={e => setText(e.target.value)}
                    ></textarea>
                    <input type="submit" class="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
        </>
    )
}



export default connect(null, { addComment })(CommentForm)
