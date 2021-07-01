import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import {Link} from 'react-router-dom';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Chip, Paper, GridListTile, GridListTileBar, IconButton, Typography, Button} from '@material-ui/core';
import {addRecommendation} from '../../redux/userSearched/userSearched.actions';
import { createStructuredSelector } from 'reselect';
import {selectCurrentDestination} from '../../redux/amadeus/amadeus.selectors';
import {connect} from 'react-redux';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      fontFamily: "Garamond Helvetica sans-serif",
      marginTop: '16px',
      marginBottom: '16px'
    },
    image: {
        width: '400px',
        height: '400px'
    },
    resultsTitle: {
        fontFamily: "Garamond Helvetica sans-serif",
        fontSize: '2rem',
        fontWeight: 'bold',
        marginTop: '5%'
    },
    infoContainer: {
        padding: '24px',
        fontFamily: "inherit",
    },
    description: {
        fontFamily: 'inherit',
        fontSize: '1.2rem',
        padding: '2%'
    },
    address: {
        fontFamily: 'inherit',
        fontWeight: 'bold',
        marginRight: '24px'
    },
    distance: {
        fontFamily: 'inherit'
    },
    price: {
        fontFamily: 'inherit',
        fontWeight: 'bolder',
        float: 'right',
        display: 'grid'
    },
    title: {
        color: theme.palette.primary.light,
        fontWeight: 'bolder'
    },
    titleBar: {
        background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 90%)',
        height: '25%'
    },
    amenities: {
        fontFamily: 'inherit',
        marginLeft: '2%',
        width: '75%'
    },
    chip: {
        fontFamily: 'inherit',
        margin: '4px'
    }
  }));

export function getDays(offer) {
    var date1 = new Date(offer.checkInDate);
    var date2 = new Date(offer.checkOutDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    return `${diffDays} day(s)`;
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const PoisResults = (props) => {
    const {data} = props;
    const classes = useStyles();

    // const addSelectionToRedux = (cityCode) => {
    //     addToUserSearched(cityCode);
    // }

    return (
        <div className="search-results-container">
                {data ? 
                <Typography gutterBottom variant="h3" component="h2" className={classes.resultsTitle}>
                    Results from your search ({data.length})
                </Typography>  : null}              
                {data ? data.map((result) => (
                <Paper elevation={4} style={{display: 'flex'}} key={result.id} className={classes.paper}>
                    <GridListTile key={result.id} cols={1}>
                        <img className={classes.image}
                            src="http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/1BBCD9A70FE94FAF8B1959D2552E21B8"
                            alt={result.name}
                        />
                        <GridListTileBar
                            title={result.name}
                            classes={{ root: classes.titleBar, title: classes.title}}
                            actionIcon={
                                <IconButton aria-label={`star ${result.name}`}>
                                    <StarBorderIcon className={classes.title} />
                                </IconButton>
                            }
                        />                
                    </GridListTile>
                    <div className={classes.infoContainer}>
                        <Typography style={{display: 'inline-block'}} gutterBottom variant="h5" component="h3">
                            {result.name}
                        </Typography>
                        <Typography style={{display: 'inline-block'}} component="span">
                            {_.times(parseInt(result.rank), (i) => (
                                <StarIcon key={i} size="small" />
                            ))}
                        </Typography>
                        {/* <div>
                            <Typography variant="subtitle1" display='inline' className={classes.address}>
                                {result.hotel.address.lines + ", " + result.hotel.address.cityName + ", " + result.hotel.address.countryCode + ", " + result.hotel.address.postalCode}
                            </Typography>
                            <Typography variant="subtitle2" display='inline' className={classes.distance}>
                                {result.hotel.hotelDistance.distance + " " + result.hotel.hotelDistance.distanceUnit.toLowerCase() + " from center"}
                            </Typography>
                        </div> */}
            
                        {/* <Typography variant="subtitle2" className={classes.description}>
                            {result.hotel.description ? result.hotel.description.text : null}
                        </Typography> */}
                        <Typography variant="h5" component="div" className={classes.price}>
                            {/* <Typography variant="subtitle2" className={classes.distance}>
                                {result.offers[0].guests.adults + " adult(s), " + getDays(result.offers[0])}
                            </Typography>
                            {result.offers[0].price.currency + " " + result.offers[0].price.total} */}
                            <Typography variant="subtitle2" className={classes.distance}>
                                <span>Included 2% commission</span>
                            </Typography>
                            
                            <Button size="large" color="primary" component={Link} 
                            to={`poi/${result.id}/${result.geoCode.longitude}/${result.geoCode.latitude}`} variant="contained">
                                View
                                <ArrowForwardIcon/>
                            </Button>
                        </Typography>

                        <Typography variant="subtitle2" component="div" className={classes.amenities}>
                            {result.tags.map((label,i) => (
                                <Chip key={i} label={label}
                                    clickable color="primary" className={classes.chip}
                                />
                            ))}
                        </Typography>
                    </div>
                </Paper>
                ))
                : 
                <div>No results found</div>}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentSelectedDestination: selectCurrentDestination
});

const mapDispatchToProps = dispatch => ({
    addToUserSearched: (cityCode) => dispatch(addRecommendation(cityCode))
}); 

export default connect(mapStateToProps, mapDispatchToProps)(PoisResults);