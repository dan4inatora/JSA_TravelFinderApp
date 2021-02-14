import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {Slide, makeStyles, Card} from '@material-ui/core';
import './carousel.styles.scss';
import first from './images/1st.jpg';
import second from './images/2nd.jpg';
import third from './images/3rd.jpg';
import fourth from './images/4th.jpg';
import fifth from './images/5th.jpg';

function Arrow(props) {
    const { direction, clickFunction } = props;
    const icon = direction === 'left' ? <FaChevronLeft /> : <FaChevronRight />;

    return <div onClick={clickFunction} 
    className={direction === 'left' ? 'arrow-icon-left' : 'arrow-icon-right'}>{icon}</div>;
}

function CarouselSlideComponent() {
    const [index, setIndex] = useState(0);
    const numSlides = 5;
    const [currentPicture, setCurrentPicture] = useState(first);
    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState('down');

    const useStyles = makeStyles(() => ({
        arrow: {
            zIndex: '20'
        },
        card: {
            width: '100vw',
            height: '80vh'
        },
        title: {
            textAlign: 'center',
        },
        media: {
            width: '100vw',
            maxHeight: '100%'
        }
    }));

    const classes = useStyles();

    const onArrowClick = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        const newIndex = (index + increment + numSlides) % numSlides;

        const oppDirection = direction === 'left' ? 'right' : 'left';
        setSlideDirection(direction);
        setSlideIn(false);
        if(newIndex === 0) {
            setCurrentPicture(first);
        } else if(newIndex === 1) {
            setCurrentPicture(second);
        } else if(newIndex === 2) {
            setCurrentPicture(third);
        } else if(newIndex === 3) {
            setCurrentPicture(fourth);
        } else if(newIndex === 4) {
            setCurrentPicture(fifth);
        }

        setTimeout(() => {
            setIndex(newIndex);
            setSlideDirection(oppDirection);
            setSlideIn(true);
        }, 500);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === 39) {
                onArrowClick('right');
            }
            if (e.keyCode === 37) {
                onArrowClick('left');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    return (
        <div className='carousel-container'>
            <Arrow direction='left' clickFunction={() => onArrowClick('left')} />
            <Slide in={slideIn} direction={slideDirection}>
                <Card className={classes.card}> 
                    <img className={classes.media} src={currentPicture}
                    alt='first'/>
                </Card>
            </Slide>
            <Arrow direction='right' clickFunction={() => onArrowClick('right')} />
        </div>
    );
}

export default CarouselSlideComponent;