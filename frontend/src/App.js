import React, {useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import './App.scss';
import HomePage, {sections} from './pages/homepage/homepage.component';
import OnboardingPage from './pages/onboarding/onboarding.page';
import DestinationsPage from './pages/destinations/destinations';
import SignUp from './components/sign-up/signUp.component';
import SignIn from './components/sign-in/signIn.component';
import Header from './components/header/header.component';
import AdminSignIn from './components/admin sign-in/adminSignIn.component';
import ProfilePage from './pages/profilePage/profilePage.component';
import HotelPage from './pages/hotelPage/hotelPage.component';
import ForgotPassword from './components/forgot-password/forgotPassword.component';
import {retrieveAccessToken} from './redux/amadeus/amadeus.actions';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors';
import {selectAmadeusAccessToken} from './redux/amadeus/amadeus.selectors'; 
import axios from 'axios';
import {connect} from 'react-redux';

console.log(process.env.REACT_APP_AMADEUS_ACCESS_TOKEN);

const App = (props) => {
    useEffect(() => {
      if(props.accessToken === '') {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', 'PJkllAaddAAeiGYEgpWl8VjE74jS23pM');
        params.append('client_secret', 'PwYk56p0BEFv0oVT');

        // axios({
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        //   url: 'https://test.api.amadeus.com/v1/security/oauth2/token?',
        //   params: params
        // }).then((response) => {
        //   if(response && response.access_token) {
        //     console.log(response);
        //     retrieveAccessToken(response.access_token);
        //   }
        // }).catch((error) => {
        //   console.log(error);
        // });
      }
    }, [props.accessToken])
    
    return (
      <div className='App'>
          <Header title="Travel Finder" sticky={false} sections={sections}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/sign-up' component={SignUp}/>
          <Route path='/sign-in' component={SignIn}/>
          <Route exact path='/forgot-password' component={ForgotPassword}/>
          <Route path='/admin-sign-in' component={AdminSignIn}/>
          <Route path='/onboarding' component={OnboardingPage}/>
          <Route path='/destinations' component={DestinationsPage}/>
          <Route path='/profile/:username/:role' render={(routeProps) => (<ProfilePage routeProps={routeProps}/>)}/>
          <Route path='hotel/:hotelId/:hotelName/:budgetValue/:adults/:startDate/:endDate' render={(routeProps) => (
            <HotelPage routeProps={routeProps}/>
          )} exact={true}/>
          <Route path='hotels/:searchString' exact={true} />
          {/* <Route path='/history' component={}/>
          <Route path='/profile/:id/:name' component={}/>
          <Route path='/tour/:id' component={}/> */}
        </Switch>
      </div>
    );
  }

const mapStateToProps = createStructuredSelector({
  accessToken: selectAmadeusAccessToken
});

const mapDispatchToProps = dispatch => ({
  setAccessToken: (accessToken) => dispatch(retrieveAccessToken(accessToken)),
}); 

export default connect(mapStateToProps, mapDispatchToProps)(App);