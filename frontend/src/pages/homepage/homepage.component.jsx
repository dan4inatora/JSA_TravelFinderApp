import React from 'react';
import Header from '../../components/header/header.component';
import Container from '@material-ui/core/Container';
import useSticky from '../../components/header/useSticky';
import CarouselSlideComponent from '../../components/carousel-slide/CarouselSlideComponent';
import Footer from '../../components/footer/footer.component';

import './homepage.styles.scss';

export const sections = [
    { title: 'Home', url: '/' },
    { title: 'Destinations', url: '/destinations' },
    { title: 'Recommended trips', url: '/recommendations' },
    { title: 'Contact us', url: '/contact-us' }
];

const HomePage = () => {
    const {isSticky, element} = useSticky();

    return (
        <Container maxWidth="lg">
            {/* <Header title="Travel Finder" sticky={isSticky} sections={sections}/> */}
            <main>
                <CarouselSlideComponent />
            </main>
            {/* <Footer/> */}
        </Container>
    )
};

export default HomePage;