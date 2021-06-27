import React, {useState} from 'react';
import axios from 'axios';
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const RatingComponent = (props) => {
    const {userId, hotelId} = props;
    const [value, setValue] = useState(3);
    const [hover, setHover] = useState(-1);
    const labels = {
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent'
    };

    const addRating = (rating) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/addRating',
                data: {
                    userId,
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

export default RatingComponent;