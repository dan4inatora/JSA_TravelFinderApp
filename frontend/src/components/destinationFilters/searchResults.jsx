import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import {Link} from 'react-router-dom';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Chip, Paper, GridListTile, GridListTileBar, IconButton, Card, CardMedia, Typography, CardActions, Button, Container, CardContent} from '@material-ui/core';
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

const SearchResults = (props) => {
    const {data, budgetValue, dateRange, selectedRadioButton} = props;
    const classes = useStyles();

    const getDays = (offer) => {
        var date1 = new Date(offer.checkInDate);
        var date2 = new Date(offer.checkOutDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        return `${diffDays} day(s)`;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <div className="search-results-container">
                <Typography gutterBottom variant="h3" component="h2" className={classes.resultsTitle}>
                    Results from your search ({data.length})
                </Typography>                
                {data ? data.map((result) => (
                <Paper elevation={4} style={{display: result.hotel.description ? 'flex' : 'none'}} key={result.hotel.dupeId} className={classes.paper}>
                    <GridListTile key={result.hotel.dupeId} cols={1}>
                        <img className={classes.image}
                            src={`${result.hotel.media[0].uri}`}
                            alt={result.hotel.name}
                        />
                        <GridListTileBar
                            title={result.hotel.name}
                            classes={{ root: classes.titleBar, title: classes.title}}
                            actionIcon={
                                <IconButton aria-label={`star ${result.hotel.name}`}>
                                    <StarBorderIcon className={classes.title} />
                                </IconButton>
                            }
                        />                
                    </GridListTile>
                    <div className={classes.infoContainer}>
                        <Typography style={{display: 'inline-block'}} gutterBottom variant="h5" component="h3">
                            {result.hotel.name}
                        </Typography>
                        <Typography style={{display: 'inline-block'}} component="span">
                            {_.times(parseInt(result.hotel.rating), (i) => (
                                <StarIcon key={i} size="small" />
                            ))}
                        </Typography>
                        <div>
                            <Typography variant="subtitle1" display='inline' className={classes.address}>
                                {result.hotel.address.lines + ", " + result.hotel.address.cityName + ", " + result.hotel.address.countryCode + ", " + result.hotel.address.postalCode}
                            </Typography>
                            <Typography variant="subtitle2" display='inline' className={classes.distance}>
                                {result.hotel.hotelDistance.distance + " " + result.hotel.hotelDistance.distanceUnit.toLowerCase() + " from center"}
                            </Typography>
                        </div>
            
                        <Typography variant="subtitle2" className={classes.description}>
                            {result.hotel.description ? result.hotel.description.text : null}
                        </Typography>
                        <Typography variant="h5" component="div" className={classes.price}>
                            <Typography variant="subtitle2" className={classes.distance}>
                                {result.offers[0].guests.adults + " adult(s), " + getDays(result.offers[0])}
                            </Typography>
                            {result.offers[0].price.currency + " " + result.offers[0].price.total}
                            <Typography variant="subtitle2" className={classes.distance}>
                            {result.offers[0].commission ? 
                                <span>Included {parseInt(result.offers[0].commission.percentage)}% commission</span>
                                : 
                                <span>Included 4% commission</span>
                            }
                            </Typography>
                            <Button size="large" color="primary" variant="contained">
                                <Link to={`hotel/${result.hotel.hotelId}/${result.hotel.name}`}>Reserve</Link>
                                <ArrowForwardIcon/>
                            </Button>
                        </Typography>

                        <Typography variant="subtitle2" component="div" className={classes.amenities}>
                            {result.hotel.amenities.map((label,i) => (
                                <Chip key={i} label={capitalizeFirstLetter(label.toLowerCase().replaceAll("_", " "))}
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

export default SearchResults;