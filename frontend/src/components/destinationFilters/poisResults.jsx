import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import {Link} from 'react-router-dom';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Chip, Paper, GridListTile, GridListTileBar, IconButton, Typography, Button} from '@material-ui/core';
import {addRecommendation} from '../../redux/userSearched/userSearched.actions';
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
                {data.length ? 
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
                                Book now
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

const mapDispatchToProps = dispatch => ({
    addToUserSearched: (cityCode) => dispatch(addRecommendation(cityCode))
}); 

// const data = [
//     {
//         "type": "location",
//         "subType": "POINT_OF_INTEREST",
//         "id": "9CB40CB5D0",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/9CB40CB5D0",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "geoCode": {
//             "latitude": 41.39165,
//             "longitude": 2.164772
//         },
//         "name": "Casa Batlló",
//         "category": "SIGHTS",
//         "rank": 5,
//         "tags": [
//             "sightseeing",
//             "sights",
//             "museum",
//             "landmark",
//             "tourguide",
//             "restaurant",
//             "attraction",
//             "activities",
//             "commercialplace",
//             "shopping",
//             "souvenir"
//         ]
//     },
//     {
//         "type": "location",
//         "subType": "POINT_OF_INTEREST",
//         "id": "5F48B525B3",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/5F48B525B3",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "geoCode": {
//             "latitude": 41.387573,
//             "longitude": 2.175313
//         },
//         "name": "Palau de la Música Catalana",
//         "category": "SIGHTS",
//         "rank": 5,
//         "tags": [
//             "sightseeing",
//             "landmark",
//             "tourguide",
//             "activities",
//             "attraction",
//             "events",
//             "theater",
//             "musicvenue",
//             "sights",
//             "commercialplace"
//         ]
//     },
//     {
//         "type": "location",
//         "subType": "POINT_OF_INTEREST",
//         "id": "AF57D529B2",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/AF57D529B2",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "geoCode": {
//             "latitude": 41.40359,
//             "longitude": 2.17436
//         },
//         "name": "La Sagrada Familia",
//         "category": "SIGHTS",
//         "rank": 5,
//         "tags": [
//             "church",
//             "sightseeing",
//             "temple",
//             "sights",
//             "attraction",
//             "historicplace",
//             "tourguide",
//             "landmark",
//             "professionalservices",
//             "latte",
//             "activities",
//             "commercialplace"
//         ]
//     },
//     {
//         "type": "location",
//         "subType": "POINT_OF_INTEREST",
//         "id": "6490DA6437",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/6490DA6437",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "geoCode": {
//             "latitude": 41.36844,
//             "longitude": 2.15357
//         },
//         "name": "Museu Nacional d'Art de Catalunya",
//         "category": "SIGHTS",
//         "rank": 5,
//         "tags": [
//             "museum",
//             "sightseeing",
//             "artgallerie",
//             "sights",
//             "tourguide",
//             "restaurant",
//             "attraction",
//             "shopping",
//             "activities",
//             "commercialplace"
//         ]
//     },
//     {
//         "type": "location",
//         "subType": "POINT_OF_INTEREST",
//         "id": "E0F7A78465",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/E0F7A78465",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "geoCode": {
//             "latitude": 41.41068,
//             "longitude": 2.226342
//         },
//         "name": "Parc del Fòrum",
//         "category": "SIGHTS",
//         "rank": 5,
//         "tags": [
//             "park",
//             "attraction",
//             "activities",
//             "tourguide",
//             "landmark",
//             "sightseeing",
//             "commercialplace",
//             "professionalservices"
//         ]
//     },
//     {
//         "type": "location",
//         "subType": "POINT_OF_INTEREST",
//         "id": "DF1ABE30F1",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/DF1ABE30F1",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "geoCode": {
//             "latitude": 41.347973,
//             "longitude": 2.074765
//         },
//         "name": "RCDE Stadium",
//         "category": "SIGHTS",
//         "rank": 5,
//         "tags": [
//             "stadium",
//             "sportclub",
//             "sports",
//             "events",
//             "sightseeing",
//             "commercialplace",
//             "club",
//             "shopping",
//             "transport",
//             "restaurant"
//         ]
//     },
//     {
//         "type": "location",
//         "subType": "POINT_OF_INTEREST",
//         "id": "631EC5882F",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/631EC5882F",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "geoCode": {
//             "latitude": 41.38402,
//             "longitude": 2.101542
//         },
//         "name": "Hospital Sant Joan de Déu Barcelona",
//         "category": "SIGHTS",
//         "rank": 5,
//         "tags": [
//             "hospital",
//             "medicalcenter",
//             "professionalservices",
//             "sightseeing",
//             "commercialplace"
//         ]
//     },
//     {
//         "type": "location",
//         "subType": "POINT_OF_INTEREST",
//         "id": "29A0671F8C",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/29A0671F8C",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "geoCode": {
//             "latitude": 41.3715,
//             "longitude": 2.05582
//         },
//         "name": "Follia",
//         "category": "RESTAURANT",
//         "rank": 5,
//         "tags": [
//             "restaurant",
//             "sightseeing",
//             "commercialplace"
//         ]
//     },
//     {
//         "type": "location",
//         "subType": "POINT_OF_INTEREST",
//         "id": "006829D957",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/006829D957",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "geoCode": {
//             "latitude": 41.359634,
//             "longitude": 2.076576
//         },
//         "name": "Los Arcos Bar",
//         "category": "RESTAURANT",
//         "rank": 5,
//         "tags": [
//             "restaurant",
//             "tapas",
//             "gastropub",
//             "bar",
//             "sightseeing",
//             "commercialplace"
//         ]
//     },
//     {
//         "type": "location",
//         "subType": "POINT_OF_INTEREST",
//         "id": "AF47F131AE",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/reference-data/locations/pois/AF47F131AE",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "geoCode": {
//             "latitude": 41.455376,
//             "longitude": 2.206609
//         },
//         "name": "Lluerna",
//         "category": "RESTAURANT",
//         "rank": 5,
//         "tags": [
//             "restaurant",
//             "sightseeing",
//             "commercialplace",
//             "seafood"
//         ]
//     }
// ]

export default connect(null, mapDispatchToProps)(PoisResults);