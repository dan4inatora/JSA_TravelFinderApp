import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './comments.styles.scss';

const Comment = (props) =>
{
    const {commentItem} = props;
    let firstName = commentItem.userId;
    let commentText= commentItem.comment;
    return(
        <div className="comment">
            <div className="name-and-tag">
                <div className="nametag">
                    <div className="user-pic">
                        <AccountCircleIcon size="small"/>
                    </div>  
                   <div className="name-pill">{firstName}</div>
                </div>
                {/* <div className="report-button-container">
                    <button className="channel-info-button report-button">Report</button>
                </div> */}
            </div>
            <div className="comment-container">{commentText}</div>
        </div>
    )
};

export default Comment;