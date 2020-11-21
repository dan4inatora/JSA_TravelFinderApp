import React from 'react';
import Header from '../../components/header/header.component';
import Container from '@material-ui/core/Container';

import './homepage.styles.scss';

const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' }
];

const HomePage = () => (
    <Container maxWidth="lg">
        <Header title="Travel Finder" sections={sections}/>
        <main>

        </main>
    </Container>
);

export default HomePage;