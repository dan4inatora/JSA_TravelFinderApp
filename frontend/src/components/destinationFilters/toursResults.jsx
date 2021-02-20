import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import {Link} from 'react-router-dom';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Chip, Paper, GridListTile, GridListTileBar, IconButton, Typography, Button} from '@material-ui/core';
import {addRecommendation} from '../../redux/userSearched/userSearched.actions';
import axios from 'axios';
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

const ToursResults = (props) => {
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
                <Paper elevation={4} style={{display: result.shortDescription ? 'flex' : 'none'}} key={result.id} className={classes.paper}>
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
                            {_.times(parseInt(result.rating), (i) => (
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
                        </div>
             */}
                        <Typography variant="subtitle2" className={classes.description}>
                            {result.shortDescription ? result.shortDescription : null}
                        </Typography>
                        <Typography variant="h5" component="div" className={classes.price}>
                            {/* <Typography variant="subtitle2" className={classes.distance}>
                                {result.offers[0].guests.adults + " adult(s), " + getDays(result.offers[0])}
                            </Typography> */}
                            {result.price.currencyCode + " " + result.price.amount}
                            <Typography variant="subtitle2" className={classes.distance}>
                                <span>Included 3% commission</span>
                            </Typography>
                             
                            <Button size="large" color="primary" variant="contained" component={Link}
                                to={`tour/${result.id}/${result.geoCode.longitude}/${result.geoCode.latitude}`}>
                                Book now
                                <ArrowForwardIcon/>
                            </Button>
                        </Typography>

                        {/* <Typography variant="subtitle2" component="div" className={classes.amenities}>
                            {result.hotel.amenities.map((label,i) => (
                                <Chip key={i} label={capitalizeFirstLetter(label.toLowerCase().replaceAll("_", " "))}
                                    clickable color="primary" className={classes.chip}
                                />
                            ))}
                        </Typography> */}
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
//         "id": "4602",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/4602",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "La Pedrera Night Experience: A Behind-Closed-Doors Tour in Barcelona",
//         "shortDescription": "In Barcelona, go inside one of Antoni Gaudi’s most celebrated buildings, La Pedrera-Casa Milà, at night for a 1.5-hour multimedia event. The show, known as La Pedrera Night Experience, takes you on a colorful journey through the landmark, culminating in a rooftop show where neon lights and projections transform his spiraling rooftop chimneys into giant candy-colored clouds or a galaxy of stars. Top off the evening with sweeping views of Barcelona as it twinkles below you, and a glass of Cava.",
//         "geoCode": {
//             "latitude": "41.395037",
//             "longitude": "2.161683"
//         },
//         "rating": "4.500000",
//         "pictures": [
//             "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6f/11/0c.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/i9uEK8aK?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "34.00"
//         }
//     },
//     {
//         "id": "4645",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/4645",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Gaudi's Casa Batlló Admission Ticket with Smart Guide",
//         "shortDescription": "Step inside Antoni Gaudi’s Casa Batlló in Barcelona with this entrance ticket and explore this incredible museum with a Smart guide. One of the best examples of Gaudi’s architectural genius, the Modernist building was created to be the most eye-catching family home in 20th-century Barcelona. Admire Gaudi’s use of light, space and color to create a place full of unique character, and learn about the man himself and his life in Barcelona!",
//         "geoCode": {
//             "latitude": "41.391700",
//             "longitude": "2.164918"
//         },
//         "rating": "4.600000",
//         "pictures": [
//             "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/af/d9/eb.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/7rtcqNyq?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "25.00"
//         }
//     },
//     {
//         "id": "65217",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/65217",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "La Pedrera skip-the-line tickets with audio guide",
//         "shortDescription": "Discover La Pedrera with an audio-guided visit. Explore the Espai Gaudí, the Pedrera Apartment, the courtyards, the exhibition room, and the roof terrace.",
//         "geoCode": {
//             "latitude": "41.395405",
//             "longitude": "2.161940"
//         },
//         "rating": "4.500000",
//         "pictures": [
//             "https://images.musement.com/cover/0004/07/thumb_306443_cover_header.jpeg?w=500"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/mOOWyEsq?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "22.00"
//         }
//     },
//     {
//         "id": "102111",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/102111",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Hop-On Hop-Off Barcelona City Tour 1 or 2 Day",
//         "shortDescription": "Discover Barcelona at your own pace on a double-decker hop-on hop-off bus tour! Choose from 1 or 2 days and access 2 routes with stops at the best sites in Barcelona! Plus, enjoy audio commentary in 15 different languages as you travel through the city.",
//         "geoCode": {
//             "latitude": "41.387360",
//             "longitude": "2.169696"
//         },
//         "rating": "4.499300",
//         "pictures": [
//             "https://cdn.getyourguide.com/img/tour_img-263339-145.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/ObjTriJdLd?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "30.00"
//         }
//     },
//     {
//         "id": "102120",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/102120",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Barcelona Hop-on Hop-off Tour: 1 or 2- Day Ticket",
//         "shortDescription": "See the fascinating city of Barcelona on a comfortable and convenient hop-on hop-off bus tour. You’ll travel on open-top double-decker buses that cover 3 different routes. Your 1-day or 2-day ticket makes it possible see all that Barcelona has to offer!",
//         "geoCode": {
//             "latitude": "41.387015",
//             "longitude": "2.170047"
//         },
//         "rating": "4.546300",
//         "pictures": [
//             "https://cdn.getyourguide.com/img/tour_img-1089291-145.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/36jIo91I3o?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "30.00"
//         }
//     },
//     {
//         "id": "102132",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/102132",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Skip the Line: Hard Rock Cafe Barcelona",
//         "shortDescription": "Skip the line at Hard Rock Cafe Barcelona and enjoy priority entrance. Choose from 2 menus featuring high-quality American food in a setting that celebrates music and features an array of rock 'n' roll memorabilia. Non-alcoholic beverage included.",
//         "geoCode": {
//             "latitude": "41.386411",
//             "longitude": "2.170863"
//         },
//         "rating": "4.505900",
//         "pictures": [
//             "https://cdn.getyourguide.com/img/tour_img-338252-145.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/aqlPPIVHz6?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "20.00"
//         }
//     },
//     {
//         "id": "102174",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/102174",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Barcelona Card: 3, 4, or 5 Days with Discounts",
//         "shortDescription": "See the best of Barcelona for a flat fee with the Barcelona Card. Choose from 3-5 days and during that time enjoy free travel on public transport, plus free offers at museums, cultural venues, leisure facilities, nightclubs, shops, restaurants, and more.",
//         "geoCode": {
//             "latitude": "41.387917",
//             "longitude": "2.169919"
//         },
//         "rating": "4.230400",
//         "pictures": [
//             "https://cdn.getyourguide.com/img/tour_img-315673-145.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/brbEWFT8zR?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "46.00"
//         }
//     },
//     {
//         "id": "102215",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/102215",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Barcelona: E-Bike Tour with Montjuic Cable Car And Boat Trip",
//         "shortDescription": "Explore Barcelona from the saddle of an electric bike and see more of the city’s most emblematic attractions. Cruise through the Gothic quarter and port, ride the cable car to Montjuic and sail to the Old Port by Goleta boat.",
//         "geoCode": {
//             "latitude": "41.383556",
//             "longitude": "2.175455"
//         },
//         "rating": "4.704100",
//         "pictures": [
//             "https://cdn.getyourguide.com/img/tour_img-515728-145.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/DI4X0gZSHN?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "50.00"
//         }
//     },
//     {
//         "id": "102243",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/102243",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Montserrat, Tapas and Wine Half-Day Tour from Barcelona",
//         "shortDescription": "Taste delicious Spanish wines and tapas at the 10th-century Oller del Mas castle on a 7-hour tour from Barcelona that also includes a short visit to the stunning Montserrat mountain complex, surrounded by gorgeous fields and jaw dropping views.",
//         "geoCode": {
//             "latitude": "41.385954",
//             "longitude": "2.170634"
//         },
//         "rating": "4.742800",
//         "pictures": [
//             "https://cdn.getyourguide.com/img/tour_img-661014-145.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/uPNTJ6S5k8?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "70.00"
//         }
//     },
//     {
//         "id": "102257",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/102257",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Palau de la Música Guided Tour",
//         "shortDescription": "Explore an icon of Barcelona’s Modernist architecture on a 45-minute guided tour of the Palau de la Música Catalana, with access to areas of the iconic building normally off limits to the public. Admire refined architectural details, and more.",
//         "geoCode": {
//             "latitude": "41.387587",
//             "longitude": "2.175239"
//         },
//         "rating": "4.605100",
//         "pictures": [
//             "https://cdn.getyourguide.com/img/tour_img-306547-145.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/IV73K3fZf6?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "20.00"
//         }
//     },
//     {
//         "id": "102320",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/102320",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Barcelona: Barrio Gotico City Tour in German",
//         "shortDescription": "Travel back in time to the Middle Ages and see how every stone has a story to tell on this walking tour through winding alleyways and picturesque squares of Barcelona's gothic quarter.",
//         "geoCode": {
//             "latitude": "41.386146",
//             "longitude": "2.171159"
//         },
//         "rating": "4.941700",
//         "pictures": [
//             "https://cdn.getyourguide.com/img/tour_img-295451-145.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/7SMxoEUHHG?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "20.00"
//         }
//     },
//     {
//         "id": "102336",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/102336",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Casa Milà-La Pedrera: Skip The Line Ticket & Audio Guide",
//         "shortDescription": "Explore one of the icons of Barcelona with a skip-the-line ticket to the Casa Milà (La Pedrera), Antoni Gaudi’s groundbreaking apartments on the Passeig de Gracia. See the Espai Gaudi exhibition, dedicated to Gaudi’s life and architectural innovations.",
//         "geoCode": {
//             "latitude": "41.395381",
//             "longitude": "2.161961"
//         },
//         "rating": "4.644500",
//         "pictures": [
//             "https://cdn.getyourguide.com/img/tour_img-1849782-145.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/iAiVP5D4O5?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "22.00"
//         }
//     },
//     {
//         "id": "102337",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/102337",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Barcelona 1-Hour Flamenco Show at Palacio del Flamenco",
//         "shortDescription": "Immerse yourself in the sensuous rhythms of Spanish flamenco at a 1-hour show at Barcelona’s Palacio del Flamenco. Choose from 3 unique performances, each presented by an enthusiastic cast of flamenco dancers, singers and musicians.",
//         "geoCode": {
//             "latitude": "41.393675",
//             "longitude": "2.156687"
//         },
//         "rating": "4.542100",
//         "pictures": [
//             "https://cdn.getyourguide.com/img/tour_img-520777-145.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/wDUrEjcAck?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "35.00"
//         }
//     },
//     {
//         "id": "102368",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/102368",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Barcelona: La Pedrera Night Experience",
//         "shortDescription": "Skip the lines to one of Barcelona’s most iconic buildings and watch an amazing audiovisual display on the roof terrace. Get a short introduction to Gaudi’s revolutionary building on the Passeig de Gracia, and see multiple projections in the stairwells.",
//         "geoCode": {
//             "latitude": "41.395384",
//             "longitude": "2.161962"
//         },
//         "rating": "4.364900",
//         "pictures": [
//             "https://cdn.getyourguide.com/img/tour_img-416642-145.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/zLA3Wdg8ac?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "34.00"
//         }
//     },
//     {
//         "id": "102466",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/102466",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Small Group Walking Tour with Helicopter Flight & Boat Trip",
//         "shortDescription": "Discover the best of Barcelona from multiple perspectives on a 4-hour tour by land, sea, and air. Stroll through the Gothic Quarter and travel back to the Middle Ages. Enjoy bird’s eye views on a helicopter flight and sail the coastline.",
//         "geoCode": {
//             "latitude": "41.383556",
//             "longitude": "2.175455"
//         },
//         "rating": "4.699100",
//         "pictures": [
//             "https://cdn.getyourguide.com/img/tour_img-2563443-145.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/Kkgqx5u5Ce?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "109.00"
//         }
//     },
//     {
//         "id": "102626",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/102626",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Barcelona: Flamenco Show at City Hall Theater",
//         "shortDescription": "Experience the passion of flamenco music and dance with a ticket to a 1-hour performance at Barcelona's historic City Hall Theater. Marvel at the artistry of the talented performers and get into the spirit of an authentic form of Spanish dance.",
//         "geoCode": {
//             "latitude": "41.387839",
//             "longitude": "2.168472"
//         },
//         "rating": "4.163000",
//         "pictures": [
//             "https://cdn.getyourguide.com/img/tour_img-1877577-145.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/8oBNONMPz8?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "18.00"
//         }
//     },
//     {
//         "id": "140141",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/140141",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Casa Milà - La Pedrera: Fast Track Entrance with Audioguide",
//         "shortDescription": "What to Expect\nYour tickets allow you to skip the ticket line and head straight to the entrance gate. The ticket remains valid through the day and you can visit the landmark anytime between 9:00 AM and 8:00 PM when the last entry is granted. Unconventional though Casa Mila's appearance may be, the actual purpose of the structure is as conventional as it can be. After all, the building is, first and foremost, residential in nature. It's hard imagining that the place was designed to be anyone's home, but as you walk through Casa Mila's lavishly adorned lobbies or the sprawling courtyards peppered with Gaudi's signature embellishments, living here seems like a dream come true. Touring the Casa Mila by day involves visiting two different parts of the museum - the Espai Gaudi and the Pedera Apartment. The former includes a broad showcase of Guadi’s work and is divided into sections dedicated to different projects and shows his life in broad strokes. The latter is a fascinating recreation of the home of a bourgeois family in Barcelona from the first third of the 20th century. Perhaps the true treasure of the building is the view from the rooftop that is decorated with distinctive corkscrew style chimneys, synonymous with the building itself. The view of Barcelona's skyline from the top of the structure is nothing short of breathtaking so any time spent here is time well spent. Enhance your trip with the free audio guide included on this tour which will give you information on the main areas of the building, the sites you can visit and the architect himself. Once the 90-minute long commentary that is available in multiple languages on the audio guide runs out, you are more than free to explore on your own.",
//         "geoCode": {
//             "latitude": "41.395302",
//             "longitude": "2.162019"
//         },
//         "rating": "4.600000",
//         "pictures": [
//             "https://cdn-imgix.headout.com/tour/5251/TOUR-IMAGE/0c6a9c84-d98c-4cd9-bdf9-5b6d7f1b83b8-3394-barcelona-casa-mila-la-pedrera-skip-the-line-access-01.png?w=500"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/t1sZRvXjMq?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "22.00"
//         }
//     },
//     {
//         "id": "140292",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/140292",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Hola Barcelona Travel Card",
//         "shortDescription": "The ultimate transportation pass in Barcelona, Hola Barcelona Transportation Pass, offers unlimited travel in the city. Explore the city, its iconic and world-famous architecture and points of interest at your own pace, and don’t worry about how you’ll get there. This pass has that covered. Feel free to use the metro, buses, and trams covered under this pass as many times as you’d like and save time and money on the expensive taxi fares in the city. This is the pass to have if you want to have the luxury of planning your own itinerary and exploring the city and its sights!\nThe pass has five variants, you can select from, 2 days, 3 days, 4 days, 5 days or opt for a BCN 2-day card. With their long validity, you’re guaranteed to save money on travel which you can utilize to indulge in some of the delicious Catalan cuisines. Not just that, the city’s metro and bus network is one of the best in Europe and is arguably the best means to discover the city. Additionally, with these passes, you also have the added convenience of being able to change your plans at your whim!\nHola Barcelona Transportation Pass Highlights Unlimited access to the trams, buses run by TMB, metro lines, FGC network, and RENFE suburban trains\nSave a bucket-load of money that you would’ve spent on taxi/cab fares in Barcelona by availing public transportation services\nSelect among five different time variants and choose the one which suits you best\nStart saving money on transport from the moment you land at the airport! Why You Shouldn’t Miss This\nThe Hola Barcelona Transportation Pass is perfect if you’re planning to explore the city at your own pace and comfort. Barcelona is a city famous for its architecture and landmark monuments. Not just that, the city is also filled with quaint boulevards, charming streets, and a majestic sea-facing promenade. The best way to check out these sights is by walking through the landscapes, and with a well-connected public network, you can take the bus, metro or tram at any point you feel tired. Another advantage offered by this pass is the perk of airport connectivity. With this pass, you can begin saving on the high rates of taxis and cab fares right from the moment you land in the city. With unlimited access to public transport services, you really don’t have to worry about getting around the city!",
//         "geoCode": {
//             "latitude": "41.386627",
//             "longitude": "2.171416"
//         },
//         "rating": "4.700000",
//         "pictures": [
//             "https://cdn-imgix.headout.com/tour/14427/TOUR-IMAGE/2babb5aa-8889-4618-81b6-58619a628023-7890-barcelona-hola-barcelona-unlimited-transportation-pass--2?w=500"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/HPaPGiimSS?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "16.00"
//         }
//     },
//     {
//         "id": "339381",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/339381",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Casa Batlló Blue tickets",
//         "shortDescription": "Discover one of Gaudí's masterpieces, a UNESCO World Heritage site and enjoy an immersive experience thanks to the augmented reality of a smart guide.",
//         "geoCode": {
//             "latitude": "41.391638",
//             "longitude": "2.164770"
//         },
//         "rating": "4.600000",
//         "pictures": [
//             "https://images.musement.com/cover/0003/68/thumb_267362_cover_header.jpeg?w=500"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/2U60y8HsW3?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "25.00"
//         }
//     },
//     {
//         "id": "354917",
//         "type": "activity",
//         "self": {
//             "href": "https://test.api.amadeus.com/v1/shopping/activities/354917",
//             "methods": [
//                 "GET"
//             ]
//         },
//         "name": "Barcelona: Casa Batlló Entrance Ticket with Smart Guide",
//         "shortDescription": "Discover Casa Batlló, one of Gaudí’s masterpieces, in an immersive experience. Explore this UNESCO World Heritage site with a virtual reality smart guide while learning about an architecture and design legend.",
//         "geoCode": {
//             "latitude": "41.391638",
//             "longitude": "2.164770"
//         },
//         "rating": "4.614300",
//         "pictures": [
//             "https://cdn.getyourguide.com/img/tour_img-1944052-145.jpg"
//         ],
//         "bookingLink": "https://b2c.mla.cloud/c/xCA9Wt50ID?c=2WxbgL36",
//         "price": {
//             "currencyCode": "EUR",
//             "amount": "25.00"
//         }
//     }
// ];

export default connect(null, mapDispatchToProps)(ToursResults);