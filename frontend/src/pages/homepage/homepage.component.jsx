import React from 'react';
import Header from '../../components/header/header.component';
import Container from '@material-ui/core/Container';
import useSticky from '../../components/header/useSticky';
import CarouselSlideComponent from '../../components/carousel-slide/CarouselSlideComponent';

import './homepage.styles.scss';

const sections = [
    { title: 'Home', url: '#' },
    { title: 'Places/Locations', url: '#' },
    { title: 'Recommended trips', url: '#' },
    { title: 'Contact', url: '#' },
    { title: 'Profile', url: '#' }
];

const HomePage = () => {
    const {isSticky, element} = useSticky();

    return (
        <Container maxWidth="lg">
            <Header title="Travel Finder" sticky={isSticky} sections={sections}/>
            <main>
                <CarouselSlideComponent />
            </main>
        </Container>
    )
};

export default HomePage;