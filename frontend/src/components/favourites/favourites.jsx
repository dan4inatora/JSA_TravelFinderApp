import React, {useState, useEffect} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Button } from '@material-ui/core';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import axios from 'axios';

const FavouritesComponent = (props) => {
    const {currentUser, hotelId} = props;
    const [isAdded, setIsAdded] = useState(false);
    const [userId] = useState(currentUser ? currentUser.id : 0);  

    useEffect(() => {
        checkIfUserAdded();
    }, [])

    const checkIfUserAdded = () => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `http://localhost:3000/isAddedToFavourites/${userId}/${hotelId}`,
                withCredentials: true
            }).then((response) => {
                if(response && response.data) {
                    resolve(response.data);
                    if(response.data) {
                        setIsAdded(true);
                    }
                }
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        })
    }

    const addToFavourites = () => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `http://localhost:3000/addFavorites/${userId}/${hotelId}`,
                data: {
                    hotelId
                },
                withCredentials: true
            }).then((response) => {
                if(response && response.data) {
                    console.log(response);
                    resolve(response.data);
                }
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        })
    }

    const removeFromFavourites = () => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `http://localhost:3000/deleteFavorites/${userId}/${hotelId}`,
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
            {isAdded ? 
                <Button size="small" onClick={() => removeFromFavourites()} disabled={userId === 0}
                    variant="contained" endIcon={<FavoriteIcon/>}>
                    Remove from favourites
                </Button> 
                :  
                <Button size="small" variant="contained" disabled={userId === 0}
                    onClick={() => addToFavourites()} endIcon={<FavoriteIcon/>}>
                    Add to favourites
                </Button> 
        }
        </React.Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps, null)(FavouritesComponent);