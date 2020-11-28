import React from 'react';
import { Card, makeStyles } from '@material-ui/core';

export default function CarouselSlide(props) {
    const { backgroundColor, title } = props.content;

    const useStyles = makeStyles(() => ({
        card: {
            backgroundColor,
            borderRadius: 5,
            padding: '25px',
            width: '100vw',
            alignItems: 'center',
            height: '70vh',
            boxShadow: '20px 20px 20px black',
            display: 'flex',
            justifyContent: 'center',
        },
        title: {
            textAlign: 'center',
        }
    }));

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <h1 className={classes.title}>{title}</h1>
        </Card>
    );
}