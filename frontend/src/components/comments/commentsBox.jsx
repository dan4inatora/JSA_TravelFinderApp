import React from 'react';
import Comment from './comment';
import AddComment from './addComment';
import './comments.styles.scss';

const CommentsBox = (props) => {
    const {isLoggedIn,comments, userId, contentId, hotelName} = props
    const hasComments=comments.length>0
    return(
        <div className="comment-box">
            <h2 className="alling-left" >Comments:</h2>
            {hasComments?
            <div className="comments">
                {comments.map((comment, index)=>(
                     <Comment commentItem={comment} key={index}/>
                ))}
            </div>:
            <h2 className="alling-left">No comments yet, be the first to comment!</h2>
            }
            {isLoggedIn?
                <AddComment contentId={contentId} userId={userId} hotelName={hotelName}/>

            :<div className="alling-left"><span className="sign-in" onClick={props.signIn}>Sign in</span> to comment</div>}
        </div>
    )
}

export default CommentsBox;