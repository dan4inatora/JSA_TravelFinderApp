import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as Yup from 'yup';
import { useFormik } from 'formik';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Travel Finder
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

const AdminSignIn = () => {
    const classes = useStyles();
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
                //registerUserAction(values);

                console.log(values);

                // registerUserMutation({variables: { username, email, password}})
                //     .then((result: any) => {
                //         registerUserSuccess();
                //         loginUserMutation({variables: { email, password}})
                //         .then((result: any) => {
                //             if(result.data.login !== undefined){
                //                 loginSuccessAction(result.data.login);
                //             }
                //             else if(result.data.loginAdmin !== undefined){
                //                 loginSuccessAction(result.data.loginAdmin);
                //             }
                            
                //             redirectToOnboarding();
                //         });     

                //     }).catch((responseBackend: any) => {
                //         console.log("Response backend: ", responseBackend);
                //         let validationErrors = responseBackend.graphQLErrors[0].extensions.exception.validationErrors;

                //         for(let i=0; i < validationErrors.length; i++) {
                //             if(validationErrors[i].property === "email") {
                //                 setResponseMessage({response: t('Register.emailInUse')});
                //             }
                //         }
                //         registerUserFailure(validationErrors);
                //     });

            } catch(error) {
                console.log(errors);
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
          Admin Sign In
        </Typography>
        {state.response ? <div className='error-box'>{state.response}</div> : null}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField variant="outlined" margin="normal" onChange={handleChange} error={errors.email === ""}
            required fullWidth id="email" helperText={errors.email ? errors.email : null}
            label="Email Address" name="email" value={values.email} autoFocus FormHelperTextProps={{className: classes.error}}
          />
          <TextField variant="outlined" margin="normal" value={values.password} onChange={handleChange} error={errors.password === ""}
            required fullWidth name="password" helperText={errors.password ? errors.password : null}
            label="Password" type="password" id="password" FormHelperTextProps={{className: classes.error}}
          />
          <Button type="submit" fullWidth variant="contained" color="primary"
            className={classes.submit}>Sign In</Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default AdminSignIn;