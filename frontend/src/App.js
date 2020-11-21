import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import './App.scss';

import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';

const App = () => {
    // useEffect(() => {
    //   setCurrentUser(currentUser);
    // }, [currentUser]);

    return (
      <div className='App'>
        <Switch>
          {/* <Route exact path='/' component={}/> */}
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
