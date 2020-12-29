import React from 'react';
import Container from '@material-ui/core/Container';
import OnboardingComponent from '../../components/onboarding/onboarding.component';

const OnboardingPage = () => {

    return (
        <Container maxWidth="lg">
            <main>
                <OnboardingComponent />
            </main>
        </Container>
    )
};

export default OnboardingPage;