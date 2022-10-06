import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SigninPic from "../Assets/signin3.jpg";
import GoogleLogin from "react-google-login";
import { Stack } from "@mui/material";
import FacebookLogin from "react-facebook-login";
import FacebookIcon from "@mui/icons-material/Facebook";
import classes from "./LoginPage.module.css";
import { useRef } from "react";
import { Link as LinkSignUp } from "react-router-dom";
import useValidInput from "../hooks/use-valid-input";

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const passCriteria = [
  "At least 8 characters",
  "Contains 1 number",
  "Contains a Capital Letter",
  "Contains a special character",
];
const responseFacebook = (response) => {
  console.log(response);
};

const responseGoogle = (response) => {
  console.log(response);
};

const componentClicked = () => {
  console.log("clicked");
};

const theme = createTheme();

export default function LoginPage() {
  const FbBtnRef = useRef();

  const {
    value: userNameValue,
    isValid: userNameIsValid,
    hasError: hasErrorUser,
    inputChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: resetUsername,
  } = useValidInput((value) => value.trim() !== "");

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: hasErrorPassword,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useValidInput((value) => value.trim() !== "");

  const isFormValid = () => {
    return userNameIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("username"),
      password: data.get("password"),
    });

    resetUsername();
    resetPassword();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${SigninPic})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Username'
                name='username'
                autoComplete='email'
                autoFocus
                value={userNameValue}
                onChange={userNameChangeHandler}
                onBlur={userNameBlurHandler}
                helperText={`${
                  hasErrorUser ? "Fill in username" : "Ex: abc@gmail.com"
                }`}
                error={hasErrorUser}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={passwordValue}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                autoComplete='current-password'
                helperText={`${hasErrorPassword ? "Fill in password" : ""}`}
                error={hasErrorPassword}
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Stack
                sx={{ width: "1" }}
                justifyContent='center'
                alignItems='center'
              >
                <Stack
                  direction='row'
                  width='80%'
                  spacing={2}
                  justifyContent='center'
                  alignItems='center'
                >
                  <GoogleLogin
                    clientId='658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
                    buttonText='Gmail'
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    className={classes["outside-login-button"]}
                    cookiePolicy={"single_host_origin"}
                    style={{
                      "&& < span": { color: "red" },
                      "&& button": {
                        color: "red",
                      },
                    }}
                  />
                  <FacebookLogin
                    ref={FbBtnRef}
                    appId='1088597931155576'
                    autoLoad={true}
                    fields='name,email,picture'
                    onClick={componentClicked}
                    cssClass={`${classes["outside-login-button"]} ${classes["fb-login-btn"]}`}
                    callback={responseFacebook}
                    icon={<FacebookIcon />}
                    textButton='Facebook'
                  />
                </Stack>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  className={
                    isFormValid() === false ? classes["btn-invalid"] : ""
                  }
                >
                  Sign In
                </Button>
              </Stack>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    to='/signup-page'
                    variant='body2'
                    component={LinkSignUp}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
