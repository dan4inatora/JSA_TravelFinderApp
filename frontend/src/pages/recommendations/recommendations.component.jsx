import React from 'react';
import { Chip, Paper, Grid, GridListTile, GridListTileBar, Box, IconButton, Typography, Button, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: "Garamond Helvetica sans-serif",
        fontSize: '3rem',
        fontWeight: '500'
    }
}));

const RecommendationPage = (props) => {
    const {username} = props.routeProps;
    const classes = useStyles();

    //fetch recommendations from redux and display in recommendations component

    return (
        <Container component="main" maxWidth="lg">
            <Paper className={classes.infoPaper}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                    Here's our recommendations for you
                </Typography>
            </Paper>
    
        </Container>
    )
}

export default RecommendationPage;