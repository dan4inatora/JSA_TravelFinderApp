import React from 'react';
import Header from '../../components/header/header.component';
import useSticky from '../../components/header/useSticky';
import {Grid, Card, CardMedia, Typography, CardActions, Button, Container, CardContent} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CarouselSlideComponent from '../../components/carousel-slide/CarouselSlideComponent';
import Footer from '../../components/footer/footer.component';

import './homepage.styles.scss';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
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
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));  

export const sections = [
    { title: 'Home', url: '/' },
    { title: 'Destinations', url: '/destinations' },
    { title: 'Recommended trips', url: '/recommendations' },
    { title: 'Contact us', url: '/contact-us' }
];

const HomePage = () => {
    const {isSticky, element} = useSticky();
    const classes = useStyles();

    return (
        // <Container maxWidth="lg" className>
        //     {/* <Header title="Travel Finder" sticky={isSticky} sections={sections}/> */}
            <main>
                <CarouselSlideComponent />
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <div className='grid-container'>
                        <Grid container >
                            <Grid item xs={12} sm={10}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://www.hiddenplaces.net/wp-content/uploads/bfi_thumb/hidden-places-travel-laos-12-no7uho2jqjm65ttlmfll9riy5427g1kfgd02tggilo.jpg"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                        Visit Laos
                                        </Typography>
                                        <Typography variant="subtitle2">
                                        Admittedly, it’s a bit confusing.  Blame it on the French colonists who stuck a silent ‘s’ on the end. So yes, it’s like ‘wow’, which actually sums up this astounding place! And here are a few of places to start with..
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
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={10}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateRome_Hero_shutterstock789412159.jpg"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                        Explore Rome
                                        </Typography>
                                        <Typography variant="subtitle2">
                                        We've got the best guide for how to spend your vacation time in Rome, Italy, with the best of unmissable sights, the musts of what to eat and drink, the museum, churches, and historical sites you've been dreaming of, and all the secret spots you never knew about.                                
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
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={10}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/United%20Kingdom/London/london-aerial-thames-guide.jpg"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                        Explore London
                                        </Typography>
                                        <Typography variant="subtitle2">
                                        Past, present and future – the city that has it all
    Having it all is most definitely a good thing but it can also be a somewhat overwhelming – where to start? London has so much to offer, for all tastes, budgets and cultural persuasions.
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
                        </Grid>
                    </div>
                </Container>
            </main>
        //     {/* <Footer/> */}
        // </Container>
    )
};

export default HomePage;