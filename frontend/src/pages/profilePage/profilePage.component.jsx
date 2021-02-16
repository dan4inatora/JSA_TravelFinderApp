import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import UserProfile from '../../components/profile-components/userProfile.component';
import AdminProfile from '../../components/profile-components/adminProfile.component';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {connect} from 'react-redux';
import {useQuery} from '@apollo/react-hooks';

const ProfilePage = (props) => {
    const {routeProps} = props;
    console.log(routeProps.match.params);

    return(
        <Container component="main" maxWidth="xl">
            {routeProps.match.params && routeProps.match.params.role === "user" ? 
                <UserProfile/>
                : 
                <AdminProfile/>
            }
        </Container>
    )
}

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser
// });

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: () => dispatch(setCurrentUser()),
// }); 

export default ProfilePage;

