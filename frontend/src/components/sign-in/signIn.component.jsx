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
import {loginUserLocal} from '../../redux/user/user.actions';
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
    marginTop: theme.spacing(1),
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

const SignIn = ({loginUser}) => {
  const classes = useStyles();
  const history = useHistory();
  const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const [state, setResponseMessage] = useState({response: ''});

  const validationSchema = Yup.object({
      email: Yup.string().email().required('Valid email required!'),
      password: Yup.string().required('Password must contain at least 8 chars and at least on number and special symbol')
          .matches(PASSWORD_REGEX)
  });

  const {handleSubmit, handleChange, values, errors } = useFormik({
      initialValues: {
          email: "",
          password: ""
      },
      validateOnBlur: true,
      validationSchema,
      onSubmit(values) {
        try {
          return new Promise((resolve, reject) => {
            axios({
              method: 'POST',
              headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
              url: 'http://localhost:3000/login',
              withCredentials: true,
              data: {
                email: values.email,
                password: values.password
              }
            }).then((response) => {
              if(response.data && response.data.email) {
                loginUser({id: response.data.id, email: response.data.email, name: response.data.firstName + " " + response.data.lastName, 
                role: response.data.role, username: response.data.username});
              }
              setTimeout(() => {
                resolve(response.data);
                history.push('/');
              }, 1000);
            }).catch((error) => {
              console.log(error);
              reject(error);
            });
          })
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
          Sign in
        </Typography>
        {state.response ? <div className='error-box'>{state.response}</div> : null}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField variant="outlined" margin="normal" onChange={handleChange} error={errors.email === ""}
            required fullWidth id="email" helperText={errors.email ? errors.email : null} autoComplete="email"
            label="Email Address" name="email" value={values.email} autoFocus FormHelperTextProps={{className: classes.error}}
          />
          <TextField variant="outlined" margin="normal" value={values.password} onChange={handleChange} error={errors.password === ""}
            required fullWidth name="password" helperText={errors.password ? errors.password : null} autoComplete="current-password"
            label="Password" type="password" id="password" FormHelperTextProps={{className: classes.error}}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser
// });

const mapDispatchToProps = dispatch => ({
  loginUser: (user) => dispatch(loginUserLocal(user))
}); 

export default connect(null, mapDispatchToProps)(SignIn);