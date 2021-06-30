import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridListTileBar, GridListTile, IconButton } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    image: {
        width: '400px',
        height: '400px'
    },
    title: {
        fontFamily: "Garamond Helvetica sans-serif",
        fontSize: '2rem',
        fontWeight: '500'
    },
    imagetitle: {
        color: theme.palette.primary.light,
        fontWeight: 'bolder'
    },
    titleBar: {
        background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 90%)',
        height: '25%'
    }
}));

const LocationPictures = (props) => {
    const {hotelId, hotelName} = props;
    const classes = useStyles();
    const [locationPics, setLocationPics] = useState([]); 

    return (
        <GridListTile cols={locationPics.length > 1 ? 2 : 1}>
            {hotelId !== 0 ? 
                locationPics.map((pic) => {
                    <React.Fragment>
                    <img className={classes.image}
                        src="http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/1BBCD9A70FE94FAF8B1959D2552E21B8"
                        alt="hotelName"
                    />
                    <GridListTileBar
                        title={pic.author}
                        classes={{ root: classes.titleBar, title: classes.imageTitle}}
                        actionIcon={
                            <IconButton aria-label={`star ${hotelName}`}>
                                <StarBorderIcon className={classes.imageTitle} />
                            </IconButton>
                        }
                    />   
                    </React.Fragment>
                })
            :
                <React.Fragment>
                    <img className={classes.image}
                        src="http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/1BBCD9A70FE94FAF8B1959D2552E21B8"
                        alt="hotelName"
                    />
                    <GridListTileBar
                        title={hotelName}
                        classes={{ root: classes.titleBar, title: classes.imageTitle}}
                        actionIcon={
                            <IconButton aria-label={`star ${hotelName}`}>
                                <StarBorderIcon className={classes.imageTitle} />
                            </IconButton>
                        }
                    />   
                </React.Fragment>
            }             
        </GridListTile>
    )
}

export default LocationPictures;