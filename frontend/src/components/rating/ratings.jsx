import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

const RatingComponent = (props) => {
    const {currentUser, hotelId} = props;
    const [value, setValue] = useState(3);
    const [hover, setHover] = useState(-1);
    const [userId] = useState(currentUser ? currentUser.id : 0);  

    const labels = {
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent'
    };

    useEffect(() => {
        getUserRating();
    }, [])

    const addRating = (rating) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `http://localhost:3000/addRating/${userId}`,
                data: {
                    hotelId, 
                    rating
                },
                withCredentials: true
            }).then((response) => {
                if(response && response.data) {
                    console.log(response);
                    resolve(response.data.data);
                }
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        })
    }

    const getUserRating = () => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `http://localhost:3000/getUserRating/${userId}/${hotelId}`,
                withCredentials: true
            }).then((response) => {
                if(response && response.data) {
                    console.log(response);
                    if(response.data.data) {
                        resolve(response.data.data);
                    }
                    
                }
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        })
    }

    return (
        <React.Fragment>
            <Rating
                name="hover-feedback"
                value={value}
                precision={1}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    addRating(newValue);
                }}
                onChangeActive={(event, newHover) => {
                setHover(newHover);
                }}
            />
            {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
        </React.Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps, null)(RatingComponent);