import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchBar from '../search-bar/search-bar.component';
import Link from '@material-ui/core/Link';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';
import { useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {connect} from 'react-redux';
import {logoutUser} from '../../redux/user/user.actions';
import './header.styles.scss';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Garamond Helvetica sans-serif"
  },
  toolbarTitle: {
    flex: 1,
    fontFamily: "Garamond Helvetica sans-serif"
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    fontFamily: "Garamond Helvetica sans-serif"
  },
  toolbarLink: {
    padding: theme.spacing(2),
    flexShrink: 0,
    fontFamily: "Garamond Helvetica sans-serif",
    fontSize: '1.3rem',

     '&:hover': {
      borderRadius: '25px',
      backgroundColor: 'gray',
      transition: '0.5s'

     }
  },
  button: {
    color: "white",
    fontSize: "1rem",
    fontFamily: "Garamond Helvetica sans-serif"
  }
}));

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { sections, title, currentUser, logout} = props;

  const redirectToProfilePage = (role, username) => {
    history.push(`/profile/${username}/${role}`);
  }

  const logoutUser = () => {
    logout();
    history.push('/');
  }

  return (
    <nav className="navbar navbar-sticky">
      <Toolbar className={classes.toolbar}>
        <Link color="inherit" noWrap href="/" underline='none' className="title-container">{title}</Link>
          {/* <SearchBar fullWidth={false}/>  */}
        
        {currentUser ? 
          <div>
            <IconButton className={classes.button} onClick={() => redirectToProfilePage(currentUser.role, currentUser.username)}>
              <AccountCircleIcon fontSize="large"/>
            </IconButton>
            <Button className={classes.button} variant="outlined" size="small" onClick={() => logoutUser()}>
                Logout
            </Button> 
          </div>
        : 
        <div>
            <Button className={classes.button} variant="outlined" size="small" onClick={() => history.push('/sign-up')}>
                Sign up
            </Button>
            <Button className={classes.button} variant="outlined" size="small" onClick={() => history.push('/sign-in')}>
                Sign in
            </Button>
        </div>
        }
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          <Link color="inherit" noWrap
           variant="body2" underline='none'
           href="/" className={classes.toolbarLink}>
            Home
          </Link>
          <Link color="inherit" noWrap 
          variant="body2" underline='none'
          href="/destinations" className={classes.toolbarLink}>
            Destinations
          </Link>
          { currentUser ?
          <Link color="inherit" noWrap 
          variant="body2" underline='none'
          href={"/recommendations" + "/" + currentUser.username} className={classes.toolbarLink}>
            Recommended Trips
          </Link> : null}
          <Link color="inherit" noWrap 
          variant="body2" underline='none'
          href={"/contact-us"} className={classes.toolbarLink}>
            Contact us
          </Link>
      </Toolbar>
    </nav>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
}); 

export default connect(mapStateToProps, mapDispatchToProps)(Header);