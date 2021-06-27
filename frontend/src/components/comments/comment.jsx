import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './comments.styles.scss';

const Comment = (props) =>
{
    const {commentItem} = props;
    let firstName = commentItem.user.firstName;
    let lastName = commentItem.user.lastName;
    let name = commentItem.user.organizationName?commentItem.user.organizationName: firstName + " " + lastName
    let commentText= commentItem.comment.comment;
    return(
        <div className="comment">
            <div className="name-and-tag">
                <div className="nametag">
                    <div className="user-pic">
                        <AccountCircleIcon size="small"/>
                    </div>  
                   <div className="name-pill">{name}</div>
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