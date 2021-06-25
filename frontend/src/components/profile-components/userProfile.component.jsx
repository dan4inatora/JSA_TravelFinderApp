import React from 'react';
import {createStructuredSelector} from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {connect} from 'react-redux';
import {Paper, Avatar} from '@material-ui/core';
import './profilePage.styles.scss';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    paper: {
        width: '100%'
    }
}));

const UserProfile = (props) => {
    const { currentUser } = props;
    const classes = useStyles();


    return (
        <div className="user-profile-container">
            <Paper className={classes.paper}>
                <Avatar alt="profile photo" src="" sizes="300" className={classes.large}>
                    <AccountCircleIcon size="large"/>
                </Avatar>
                <h1>{currentUser.username}</h1>
                <h3>{currentUser.name}</h3>
            </Paper>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, null)(UserProfile);