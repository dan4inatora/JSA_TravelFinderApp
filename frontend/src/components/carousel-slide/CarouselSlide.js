import React from 'react';
import { Card, makeStyles } from '@material-ui/core';

export default function CarouselSlide(props) {
    const { backgroundColor, title } = props.content;

    const useStyles = makeStyles(() => ({
        card: {
            backgroundColor,
            borderRadius: 5,
            width: '100vw',
            alignItems: 'center',
            height: '70vh',
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