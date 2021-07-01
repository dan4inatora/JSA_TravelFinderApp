import React, {useState} from 'react';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import './comments.styles.scss';

const AddComment = (props) => {   
    const {userId, contentId, hotelName} = props;
    const [showAddComment, setShowAddComment] = useState(false);
    const [comment, setComment] = useState("");

    // const handleOpenClose = ()=>
    // {
    //     setShowAddComment(!showAddComment);
    // }
    const handleChange =(e) =>
    {
        let comment=e.target.value;
        setComment(comment);
    }

    const addComment = () => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/addComment',
                data: {
                    userId, 
                    hotelId: contentId, 
                    comment
                },
                withCredentials: true
            }).then((response) => {
                if(response && response.data) {
                    console.log(response);
                    resolve(response.data.data);
                    setComment("");
                }
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        })
    }

    const editComment = () => {
        
    }

    const handleSubmit = (e) =>
    {
        if(comment!=="")
        {
            addComment();
        }
        
    }

    return(
        <div className='add-comment-box'>
            <div className="add-comment-form">
                <TextField id="standard-basic" onChange={handleChange} disabled={userId === 0} value={comment} multiline rowsMax={10} variant="standard" label="Write your comment..."/>
                <button onClick={handleSubmit} disabled={userId === 0} className="post-comment">Send</button>
            </div>
            {userId === 0 ? 
                <h2 className="error-box">
                You have to 
                &nbsp;
                    <a href="/sign-in" >Log In</a>
                &nbsp;
                    in order to comment. 
                </h2>
            : null}
        </div>
    )
}
export default AddComment;