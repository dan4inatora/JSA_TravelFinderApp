import React, {useState, useEffect} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Button } from '@material-ui/core';
import axios from 'axios';

const FavouritesComponent = (props) => {
    const {userId, hotelId} = props;
    const [isAdded, setIsAdded] = useState(false);

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
                    resolve(response.data.data);
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
                url: `http://localhost:3000/addFavorites/${userId}`,
                data: {
                    hotelId
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
                <Button size="small" onClick={() => removeFromFavourites()}
                    variant="contained" endIcon={<FavoriteIcon/>}>
                    Remove from favourites
                </Button> 
                :  
                <Button size="small" variant="contained" onClick={() => addToFavourites()} endIcon={<FavoriteIcon/>}>
                    Add to favourites
                </Button> 
        }
        </React.Fragment>
    )
}

export default FavouritesComponent;