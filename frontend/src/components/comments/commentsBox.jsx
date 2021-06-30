import React, { useEffect } from 'react';
import Comment from './comment';
import AddComment from './addComment';
import axios from 'axios';
import './comments.styles.scss';
import { useState } from 'react';

const CommentsBox = (props) => {
    const {isLoggedIn, userId, contentId, hotelName} = props
    const [hasComments, setHasComments] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getAllCommentsForContentId();
    }, [])

    const getAllCommentsForContentId = () => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `http://localhost:3000/getAllComments/${contentId}`,
                withCredentials: true
            }).then((response) => {
                if(response && response.data) {
                    resolve(response.data.data);
                    if(response.data) {
                        setHasComments(true);
                        setComments(response.data.data);
                    }
                }
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        })
    }

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