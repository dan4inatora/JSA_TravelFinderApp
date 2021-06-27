import React from "react";
import { Switch, Route } from "react-router-dom";
import './App.scss';
import HomePage, {sections} from './pages/homepage/homepage.component';
import RecommendationPage from './pages/recommendations/recommendations.component';
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
import Footer from './components/footer/footer.component';
import {connect} from 'react-redux';

const App = (props) => {
    
    return (
      <div className='App'>
          <Header title="Travel Finder" sticky={false} sections={sections}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/sign-up' component={SignUp}/>
          <Route path='/sign-in' component={SignIn}/>
          <Route exact path='/forgot-password' component={ForgotPassword}/>
          <Route path='/admin-sign-in' component={AdminSignIn}/>
          <Route path='/recommendations/:username' render={(routeProps) => (<RecommendationPage routeProps={routeProps}/>)} exact={true}/>
          <Route path='/destinations' component={DestinationsPage}/>
          <Route path='/profile/:username/:role' render={(routeProps) => (<ProfilePage routeProps={routeProps}/>)} exact={true}/>
          <Route path='/hotel/:hotelId/:longitude/:latitude' render={(routeProps) => (
            <React.Fragment>
              <HotelPage routeProps={routeProps}/>
            </React.Fragment>
          )} exact={true}/>
          <Route path='/poi/:hotelId/:longitude/:latitude' render={(routeProps) => (
            <React.Fragment>
              <HotelPage routeProps={routeProps}/>
            </React.Fragment>
          )} exact={true}/>
          <Route path='/tour/:hotelId/:longitude/:latitude' render={(routeProps) => (
            <React.Fragment>
              <HotelPage routeProps={routeProps}/>
            </React.Fragment>
          )} exact={true}/>
          <Route path='hotels/:searchString' exact={true} />
        </Switch>
        <Footer/>
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