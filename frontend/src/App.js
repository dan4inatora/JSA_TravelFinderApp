import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import './App.scss';

import HomePage from './pages/homepage/homepage.component';
import SignUp from './components/sign-up/signUp.component';
import SignIn from './components/sign-in/signIn.component';
import AdminSignIn from './components/admin sign-in/adminSignIn.component';
import ForgotPassword from './components/forgot-password/forgotPassword.component';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';

const App = () => {
    // useEffect(() => {
    //   setCurrentUser(currentUser);
    // }, [currentUser]);

    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/sign-up' component={SignUp}/>
          <Route path='/sign-in' component={SignIn}/>
          <Route exact path='/forgot-password' component={ForgotPassword}/>
          <Route path='/admin-sign-in' component={AdminSignIn}/>
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
