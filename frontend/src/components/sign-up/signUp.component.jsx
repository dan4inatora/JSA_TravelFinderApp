import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import {connect} from 'react-redux';
import {registerUser} from '../../redux/user/user.actions';
import { useHistory } from 'react-router-dom';
import { Copyright } from '../footer/footer.component';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red',
    fontSize: '10px',
    width: '200px'
  }
}));

const SignUp = ({registerUser}) => {
  const classes = useStyles();
  const history = useHistory();
  const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const [state, setResponseMessage] = useState({response: ''});

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email().required('Valid email required!'),
    password: Yup.string().required('Password must contain at least 8 chars and at least on number and special symbol')
    .matches(PASSWORD_REGEX),
    agreedWithTerms: Yup.boolean().oneOf([true], 'Terms and conditions must be accepted before proceeding')
  });

  const {handleSubmit, handleChange, values, errors } = useFormik({
      initialValues: {
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          agreedWithTerms: false
      },
      validateOnBlur: true,
      validationSchema,
      onSubmit(values) {
          try {
              axios({
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                url: 'http://localhost:3000/register',
                withCredentials: true,
                data: {
                  email: values.email,
                  username: values.username,
                  firstname: values.firstName,
                  lastname: values.lastName,
                  password: values.password
                }
              }).then((response) => {
                if(response.data && response.data.email) {
                  registerUser({id: response.data.id, email: response.data.email, name: response.data.firstName + " " + response.data.lastName, 
                    role: response.data.role, username: response.data.username});
                }

                setTimeout(() => {
                  history.push('/');
                }, 1000);
              }).catch((error) => {
                console.log(error);
              });

              console.log(values);
          } catch(error) {
              console.error(error);
          }
      }
  })
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {state.response ? <div className='error-box'>{state.response}</div> : null}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField variant="outlined" required fullWidth
                    id="username" label="Username" name="username" autoComplete="username" autoFocus onChange={handleChange}
                    FormHelperTextProps={{className: classes.error}} value={values.username} error={errors.username === ""}
                    helperText={errors.username ? errors.username : null}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="fname" name="firstName" variant="outlined" required onChange={handleChange}
                fullWidth id="firstName" label="First Name" error={errors.firstName === ""} helperText={errors.firstName ? errors.firstName : null}
                FormHelperTextProps={{className: classes.error}} value={values.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField variant="outlined" required fullWidth id="lastName" onChange={handleChange}
                label="Last Name" name="lastName" error={errors.lastName === ""} value={values.lastName}
                helperText={errors.lastName ? errors.lastName : null} FormHelperTextProps={{className: classes.error}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" margin="normal" onChange={handleChange} error={errors.email === ""}
                required fullWidth id="email" helperText={errors.email ? errors.email : null} autoComplete="email"
                label="Email Address" name="email" value={values.email} autoFocus FormHelperTextProps={{className: classes.error}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" margin="normal" value={values.password} onChange={handleChange} error={errors.password === ""}
                required fullWidth name="password" helperText={errors.password ? errors.password : null} autoComplete="current-password"
                label="Password" type="password" id="password" FormHelperTextProps={{className: classes.error}}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={values.agreedWithTerms} name="agreedWithTerms" onChange={handleChange} color="primary" />}
                label="I agree to the Terms and Conditions."
              />
              <span className={classes.error}>{errors.agreedWithTerms}</span>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained"
            color="primary" className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser
// });

const mapDispatchToProps = dispatch => ({
  registerUser: (user) => dispatch(registerUser(user))
}); 

export default connect(null, mapDispatchToProps)(SignUp);