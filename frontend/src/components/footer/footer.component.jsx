import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import './footer.styles.scss';

export const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="#">
          Travel Finder
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: 'gray',
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <div className='footer-container'>
            <div className='footer-column'>
                <section>
                    <div className="widget-title">Coordinates</div>			
                    <div className="text-widget">
                        <p>Box 318, 185-911 Yates Street<br/>
                            Victoria, BC, Canada V8V 4Y9<br/>
                            Phone: <a href="tel:+12503800994">1 250 380 0994</a><br/>
                            Toll Free: <a href="tel:+18778308747">1 877 830 8747</a><br/>
                            <a href="mailto:info@hiddenplaces.net">info@hiddenplaces.net</a>
                        </p>
                        <p>Office:<br/>
                        313-599 Pandora St.<br/>
                        Victoria, BC V8W 1N5</p>
                    </div>
                </section>
            </div>
            <div className='footer-column'>
            <section>
                    <div className="widget-title">Pages</div>			
                    <div className="text-widget">
                        <a href="/destinations">Destinations</a>
                        <a href="/recommended-trips">Recommended Trips</a>
                        <a href="/contact-us">Contact Us</a>
                        <a href="/profile">Profile</a>
                    </div>
                </section>
            </div>
            <div className='footer-column'>
                <section>
                    <div className="widget-title">License</div>			
                    <div className="text-widget">
                        <p>We are a fully licensed tour operator and travel agent 
                            registered with Consumer Protection BC. That means when you book with 
                            us you are protected by the 
                            <a href="https://www.consumerprotectionbc.ca/consumers-travel-services/travel-assurance-fund">
                            Travel Assurance Fund. Click here for more info</a>.
                            </p>
                    </div>
                </section>
            </div>
            <div className='footer-column'>
            <section>
                    <div className="widget-title">Sign up for our newsletter</div>			
                    <div className="text-widget">
                        <form>
                            <TextField variant="outlined" margin="normal" required fullWidth id="email"
                                label="Your Email Address" name="email" autoFocus
                            />
                            <Button type="submit" fullWidth variant="contained" color="primary"
                                className={classes.submit}>
                                Submit
                            </Button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
        <Copyright />
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default Footer;