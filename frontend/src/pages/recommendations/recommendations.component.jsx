import React, {useState, useEffect} from 'react';
import { Chip, Paper, Grid, Card, CardMedia, CardContent, CardActions, Typography, Button, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {data} from '../destinations/destinations';
import {selectUserSearches} from '../../redux/userSearched/userSearched.selectors';

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: "Garamond Helvetica sans-serif",
        fontSize: '3rem',
        fontWeight: '500'
    },
    recommendationContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: '18px'
    },
    infoPaper: {
        border: '2px solid #d9e1ec',
        backgroundColor: '#f1f4f8',
        padding: '4%'
    },
    icon: {
        marginRight: theme.spacing(2),
      },
      heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
      },
      heroButtons: {
        marginTop: theme.spacing(4),
        fontFamily: "Garamond Helvetica sans-serif"
      },
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '100%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
        fontFamily: "Garamond Helvetica sans-serif"
      },
      footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
      },
}));

const RecommendationPage = (props) => {
    const {username} = props.routeProps;
    const {userSearches} = props;
    const classes = useStyles();
    const [recommendations, setRecommendations] = useState(data);

    useEffect(() => {
        console.log(userSearches.length, userSearches[0]);
        //sort key value pair list then call axios for top 2 city codes
    }, [userSearches])

    //fetch recommendations from redux and display in recommendations component

    return (
        <Container component="main" maxWidth="lg">
            <Paper className={classes.infoPaper}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                    Here's our recommendations for you
                </Typography>

                <Grid container className={classes.recommendationContainer}>
                    {recommendations.map((recommendation, i) => (
                        <Grid item xs={6} sm={5} key={i}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={recommendation.hotel.media[0].uri}
                                    title={recommendation.hotel.name}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    {recommendation.hotel.name + ", " + recommendation.hotel.address.cityName}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                    {recommendation.hotel.description ? recommendation.hotel.description.text : 'No Description'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                    View
                                    </Button>
                                    <Button size="small" color="primary">
                                    Edit
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    userSearches: selectUserSearches
});
  
// const mapDispatchToProps = dispatch => ({
// setAccessToken: (accessToken) => dispatch(retrieveAccessToken(accessToken)),
// }); 

export default connect(mapStateToProps, null)(RecommendationPage);