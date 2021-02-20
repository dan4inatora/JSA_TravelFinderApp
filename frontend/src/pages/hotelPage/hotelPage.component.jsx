import React from 'react';
import { Chip, Paper, Grid, GridListTile, GridListTileBar, Box, IconButton, Typography, Button, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import {Link} from 'react-router-dom';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {capitalizeFirstLetter, getDays} from '../../components/destinationFilters/searchResults';
import RoomIcon from '@material-ui/icons/Room';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import PrintIcon from '@material-ui/icons/Print';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import Rating from '@material-ui/lab/Rating';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
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
        paddingLeft: '8%',
        paddingRight: '8%',
        paddingTop: '4%',
        paddingBottom: '4%',
        width: '45%',
        float: 'center'
    },
    address: {
        fontFamily: 'inherit',
        marginRight: '24px',
        fontSize: '1rem',
        display: 'block',
        textAlign: 'left'
    },
    subtitle: {
        fontFamily: 'inherit',
        fontSize: '1.3rem',
        display: 'block',
        textAlign: 'left',
        marginTop: '1rem',
        marginBottom: '1rem'
    },
    greenAvailable: {
        fontFamily: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        color: 'green',
        fontSize: '1rem'
    },
    redUnavailable: {
        fontFamily: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        color: 'red',
        fontSize: '1rem'
    },
    price: {
        fontFamily: 'inherit',
        fontWeight: 'bolder',
        float: 'right',
        display: 'grid'
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
    },
    amenities: {
        fontFamily: 'inherit',
        marginLeft: '2%',
        width: '65%',
        margin: '0 auto'
    },
    chip: {
        fontFamily: 'inherit',
        margin: '4px'
    },
    info: {
        fontFamily: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem',
        marginTop: '12px'
    },
    stars: {
        color: '#febb02'
    },
    infoPaper: {
        border: '2px solid #d9e1ec',
        backgroundColor: '#f1f4f8',
        padding: '4%'
    },
    distance: {
        fontFamily: "Garamond Helvetica sans-serif",
        fontSize: '1.3rem',
    },
    cancelation: {
        fontFamily: "Garamond Helvetica sans-serif",
        fontSize: '1rem',
        color: 'red'
    },
    offerType: {
        fontFamily: 'inherit',
        marginBottom: '18px',
        fontSize: '1.5rem',
        fontWeight: '600',
        display: 'block',
        textAlign: 'center'
    },
    rating: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '4%'
      },
}));


const HotelPage = (props) => {
    const classes = useStyles();
    const {routeProps} = props;
    const {hotelId, hotelName, adults} = routeProps.match.params;
    const [value, setValue] = React.useState(1);
    const [hover, setHover] = React.useState(-1);
    console.log(hotelId, hotelName, adults);

    const labels = {
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent'
      };

    return (
        <Container component="main" maxWidth="xl">
            <GridListTile key={data.hotel.dupeId} cols={1}>
                <img className={classes.image}
                    src={`${data.hotel.media[0].uri}`}
                    alt={data.hotel.name}
                />
                <GridListTileBar
                    title={data.hotel.name}
                    classes={{ root: classes.titleBar, title: classes.imageTitle}}
                    actionIcon={
                        <IconButton aria-label={`star ${data.hotel.name}`}>
                            <StarBorderIcon className={classes.imageTitle} />
                        </IconButton>
                    }
                />                
            </GridListTile>
            <div className={classes.infoContainer}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                    {data.hotel.name + ", " + data.hotel.address.cityName}
                </Typography>
                <Typography style={{display: 'inline-block'}} component="span">
                    {_.times(parseInt(data.hotel.rating), (i) => (
                        <StarIcon key={i} size="small" className={classes.stars}/>
                    ))}
                </Typography>
                <div>                    
                    {data.available ? 
                    <Typography variant="subtitle2" display='inline' className={classes.greenAvailable}>
                        <EventAvailableIcon/> There are still rooms available
                    </Typography>
                    : 
                    <Typography variant="subtitle2" display='inline' className={classes.redUnavailable}>
                        <HourglassFullIcon/> Currently fully booked
                    </Typography>}
                </div>

                <Paper className={classes.infoPaper} style={{float: 'right', display: 'grid', marginTop: '34px'}}>
                    <Typography variant="subtitle2" className={classes.info}>
                        <RoomIcon/> {data.hotel.address.lines[0] + ", " + data.hotel.address.cityName + ", " + data.hotel.address.postalCode + ", " + data.hotel.address.countryCode}
                    </Typography>
                    <Typography variant="subtitle2" className={classes.info}>
                        <MailOutlineIcon/> {data.hotel.contact.email}
                    </Typography>
                    <Typography variant="subtitle2" className={classes.info}>
                        <PhoneIcon/> {data.hotel.contact.phone}
                    </Typography>
                    <Typography variant="subtitle2" className={classes.info}>
                        <PhoneIcon/> {data.hotel.contact.fax}
                    </Typography>
                </Paper>

                <Typography variant="subtitle2" className={classes.description}>
                    {data.hotel.description ? data.hotel.description.text : null}
                </Typography>                

                <Typography variant="subtitle2" component="div" className={classes.amenities}>
                    <Typography variant="subtitle1" display='inline' className={classes.subtitle}>
                        Amenities:
                    </Typography>
                    <Paper className={classes.infoPaper}>
                        {data.hotel.amenities.map((label,i) => (
                            <Chip key={i} label={capitalizeFirstLetter(label.toLowerCase().replaceAll("_", " "))}
                                clickable color="primary" className={classes.chip}
                            />
                        ))}
                    </Paper>
                </Typography>

                <Paper className={classes.rating}>
                    <Typography variant="subtitle2" className={classes.info}>
                        Rate {data.hotel.name}?
                    </Typography>
                    <Rating
                        name="hover-feedback"
                        value={value}
                        precision={1}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                        setHover(newHover);
                        }}
                    />
                    {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                </Paper>

                <Typography variant="subtitle1" display='inline' className={classes.subtitle}>
                    Prices and Offers:
                </Typography>
                {data.offers.length ? data.offers.map((offer, i) => (
                <Paper className={classes.infoPaper} key={i}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="subtitle1" display='inline' className={classes.offerType}>
                                {capitalizeFirstLetter(offer.room.typeEstimated.category.toLowerCase().replaceAll("_", " "))}
                            </Typography>
                            <Typography variant="subtitle1" display='inline' className={classes.address}>
                                {offer.room.description.text}
                            </Typography>
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <Typography variant="subtitle2" className={classes.distance}>
                                {offer.guests.adults + " adult(s), " + getDays(offer)}
                            </Typography>
                            <Typography variant="subtitle2" className={classes.distance}>
                                Total: {offer.price.currency + " " + offer.price.total}
                                ({offer.commission ? 
                                    <span>Included {parseInt(offer.commission.percentage)}% commission</span>
                                    : 
                                    <span>Included 4% commission</span>
                                })                            
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2" className={classes.distance}>
                                Payment type: {offer.policies.paymentType}
                            </Typography>
                            <Typography variant="subtitle2" className={classes.distance}>
                                Accepted Payments: 
                                {
                                    offer.policies.deposit.acceptedPayments.methods.map((method) => 
                                {
                                    return capitalizeFirstLetter(method.toLowerCase().replaceAll("_", " "));
                                })}
                            </Typography> 
                            <Typography variant="subtitle2" className={classes.cancelation}>
                                Cancellation: {offer.policies.cancellation.description.text}
                                Amount: {offer.price.currency + " " + offer.policies.cancellation.amount}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography variant="subtitle2" className={classes.distance}>
                                <Button size="large" color="primary" variant="contained">
                                    Book Now
                                    <PhoneIcon/>
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                )) : 
                <Typography variant="subtitle1" display='inline' className={classes.address}>
                    No offers for this hotel were found...
                </Typography>}
            </div>
        </Container>
    )

}

const data = {
        "type": "hotel-offers",
        "hotel": {
            "type": "hotel",
            "hotelId": "HSBERAIQ",
            "chainCode": "HS",
            "dupeId": "700085430",
            "name": "Arte Luise Kunsthotel",
            "rating": "3",
            "cityCode": "BER",
            "latitude": 52.52159,
            "longitude": 13.37967,
            "address": {
                "lines": [
                    "LUISENSTR. 19"
                ],
                "postalCode": "10117",
                "cityName": "BERLIN",
                "countryCode": "DE"
            },
            "contact": {
                "phone": "(49) 30284480",
                "fax": "(49) 3028448448",
                "email": "info@luise-berlin.com"
            },
            "description": {
                "lang": "en",
                "text": "The hotel Arte Luise Kunsthotel in Berlin welcomes its guests in a pleasant and urbane ambience. It offers comfortable rooms that have been individually designed by famous artists. The rooms are equipped with bathroom/toilet, TV and free W-LAN. Regional and Mediterranean dishes are served in the restaurant ‘Habel’."
            },
            "amenities": [
                "24_HOUR_FRONT_DESK",
                "CASINO",
                "DOCTOR_ON_CALL",
                "ELEVATOR",
                "INTERNET_SERVICES",
                "PARKING",
                "GARAGE_PARKING",
                "SAFE_DEPOSIT_BOX",
                "VENDING_MACHINES",
                "ICE_MACHINES",
                "CONCIERGE",
                "DRIVING_RANGE",
                "NIGHT_CLUB",
                "WIRELESS_CONNECTIVITY",
                "CAR_RENTAL",
                "GIFT_SHOP",
                "LAUNDRY_SERVICE",
                "ATM/CASH_MACHINE",
                "FIRE_DETECTORS",
                "VIDEO_SURVEILANCE"
            ],
            "media": [
                {
                    "uri": "http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/09D175C6BF0C4E3AA84FFF567E716D01",
                    "category": "EXTERIOR"
                }
            ]
        },
        "available": true,
        "offers": [
            {
                "id": "Y7HZOWBCRC",
                "checkInDate": "2021-02-18",
                "checkOutDate": "2021-02-19",
                "rateCode": "PRO",
                "rateFamilyEstimated": {
                    "code": "PRO",
                    "type": "P"
                },
                "commission": {
                    "percentage": "4.00"
                },
                "boardType": "ROOM_ONLY",
                "room": {
                    "type": "ROH",
                    "typeEstimated": {
                        "category": "STANDARD_ROOM"
                    },
                    "description": {
                        "text": "Hot Deal\nStandard room A standard room consists of a room with shower-toilet or bathtub-toilet.",
                        "lang": "EN"
                    }
                },
                "guests": {
                    "adults": 1
                },
                "price": {
                    "currency": "EUR",
                    "total": "70.00",
                    "taxes": [
                        {
                            "code": "VALUE_ADDED_TAX",
                            "percentage": "7.00",
                            "included": true
                        },
                        {
                            "code": "FOOD_AND_BEVERAGE_TAX",
                            "percentage": "7.00",
                            "included": true
                        }
                    ],
                    "variations": {
                        "average": {
                            "total": "70.00"
                        },
                        "changes": [
                            {
                                "startDate": "2021-02-18",
                                "endDate": "2021-02-19",
                                "total": "70.00"
                            }
                        ]
                    }
                },
                "policies": {
                    "deposit": {
                        "amount": "70.00",
                        "acceptedPayments": {
                            "creditCards": [
                                "VI",
                                "MC",
                                "CA"
                            ],
                            "methods": [
                                "CREDIT_CARD"
                            ]
                        }
                    },
                    "paymentType": "deposit",
                    "cancellation": {
                        "description": {
                            "text": "The cancellation policy only applies for bookings with deposit."
                        },
                        "amount": "63.00",
                        "deadline": "2021-02-16T16:08:00+01:00"
                    }
                }
            }
        ],
        "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=HSBERAIQ"
    }

export default HotelPage;