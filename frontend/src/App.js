import React from "react";
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
import ForgotPassword from './components/forgot-password/forgotPassword.component';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';

console.log(process.env.REACT_APP_AMADEUS_ACCESS_TOKEN);

const App = () => {
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
          {/* <Route path='/history' component={}/>
          <Route path='/profile/:id/:name' component={}/>
          <Route path='/tour/:id' component={}/> */}
        </Switch>
      </div>
    );
  }

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser
// });

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: () => dispatch(setCurrentUser()),
// }); 

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
