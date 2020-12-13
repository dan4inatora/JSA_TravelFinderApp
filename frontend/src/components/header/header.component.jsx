import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SearchBar from '../search-bar/search-bar.component';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../../redux/user/user.actions';
import './header.styles.scss';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { sections, title, sticky , currentUser, logout} = props;

  return (
    <nav className={sticky ? "navbar navbar-sticky" : ''}>
      <Toolbar className={classes.toolbar}>
        <SearchBar /> 
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        
        {currentUser ? 
            <Button variant="outlined" size="small" onClick={() => logout()}>
                Logout
            </Button> 
        : 
        <div>
            <Button variant="outlined" size="small" onClick={() => history.push('/sign-up')}>
                Sign up
            </Button>
            <Button variant="outlined" size="small" onClick={() => history.push('/sign-in')}>
                Sign in
            </Button>
        </div>
        }
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link color="inherit" noWrap
            key={section.title} variant="body2" href={section.url} className={classes.toolbarLink}>
            {section.title}
          </Link>
        ))}
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