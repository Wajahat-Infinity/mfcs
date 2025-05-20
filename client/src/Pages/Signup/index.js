import React, { useEffect, useState } from "react";
import { Typography, Link, Grid, Box, IconButton } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import SignInModal from "../../components/SignIn/SignInModal";
import { InputField } from "../../units/FormUnits";
import HeaderTab from "../../units/Tabs/HeaderTab";
import SidebarTab from "../../units/Tabs/SidebarTab";
import { signUp } from "../../Redux/Actions/Auth";
import * as TYPES from "../../Redux/Actions/Auth";
import Paper from "../../units/Paper";
import { useStyles } from "./styles";
import SocialLogin from "../../components/SocialLogIn";
import { ProgressButton } from "../../units/Button";
import Modal from "../../units/Modal";
import CloseIcon from "@material-ui/icons/Cancel";
import Divider from "../../units/Divider";

// validation Using Yup
const validationSchema = yup.object({
  fname: yup
    .string()
    .required("First name is requried.")
    .matches(/[a-zA-Z]/i, "Please enter a valid name."),

  lname: yup
    .string()
    .required("Last name is requried.")
    .matches(/[a-zA-Z]/i, "Please enter a valid name."),

  username: yup
    .string()
    .required("Username is requried.")
    .matches(
      /^[a-zA-Z0-9_]{3,15}$/,
      "username can only have alphanumeric and _."
    ),
  email: yup
    .string()
    .required("Email is required.")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
      "Invalid Email. Please check it again."
    ),
  password: yup
    .string()
    .required("Password is required.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Password must contain 8 characters, one uppercase, lowercase, number and a special character."
    ),
  country: yup.string().required("Country is requried."),
  state: yup.string().required("State is requried."),
  city: yup.string().required("City is requried."),
});

const Signup = ({
  isUserSignedIn,
  signUp,
  isSignUpLoading,
  isSignUpLoadingFailed,
  signUpMessage,
}) => {
  const classes = useStyles();
  const [openSignIn, setOpenSignIn] = useState(false);
  const handleSignInOpen = () => {
    setOpenSignIn(true);
  };
  const handleSignInClose = () => {
    setOpenSignIn(false);
  };
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignUpLoadingFailed)
      enqueueSnackbar(signUpMessage, { variant: "error" });
    else if (signUpMessage && !isSignUpLoading) {
      enqueueSnackbar(signUpMessage, { variant: "success" });
      let form = document.getElementById("signup-form");
      form.reset();
      form.blur();
    }
  }, [isSignUpLoading, signUpMessage, enqueueSnackbar, isSignUpLoadingFailed]);

  useEffect(() => {
    return () => {
      dispatch({ type: TYPES.CLEAR_SIGN_UP_MESSAGE });
    };
  }, [dispatch]);

  return isUserSignedIn ? (
    <Redirect to={{ pathname: "/dashboard" }} />
  ) : (
    <React.Fragment>
      <HeaderTab />
      <SidebarTab>
        <Paper className={classes.root}>
          <Typography className={classes.title} variant="h2">
            Join Us
          </Typography>

          <Formik
            initialValues={{
              fname: "",
              lname: "",
              username: "",
              email: "",
              password: "",
              country: "",
              state: "",
              city: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (data, { setSubmitting }) => {
              setSubmitting(true);
              await signUp(data);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form id="signup-form">
                <Grid container spacing={1}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField
                      placeholder="Enter First Name"
                      width={true}
                      name="fname"
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField
                      placeholder="Enter Last Name"
                      width={true}
                      name="lname"
                    />
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField
                      placeholder="Enter Username"
                      width={true}
                      name="username"
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField
                      placeholder="Enter Email"
                      width={true}
                      type="email"
                      name="email"
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField
                      placeholder="Enter Password"
                      width={true}
                      type="password"
                      name="password"
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField
                      placeholder="Country"
                      width={true}
                      name="country"
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField
                      placeholder="State/Province"
                      width={true}
                      name="state"
                    />
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputField placeholder="City" width={true} name="city" />
                  </Grid>

                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <div className={classes.submitButtonContainer}>
                        <ProgressButton
                          disabled={isSubmitting}
                          className={classes.signupButton}
                          type="submit"
                          loading={isSubmitting}
                        >
                          Join
                        </ProgressButton>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          <div className={classes.loginLink}>
            <Typography className="text">Already an account?</Typography>
            <Link role="button" onClick={handleSignInOpen}>
              SIGN IN
            </Link>
          </div>

          <SocialLogin />
        </Paper>
      </SidebarTab>

      <SignUpSuccessModal
        signUpMessage={signUpMessage}
        open={signUpMessage && !isSignUpLoadingFailed}
      />
      <SignInModal
        openSignIn={openSignIn}
        handleSignInClose={handleSignInClose}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { Auth } = state;
  return {
    ...Auth,
  };
};

const mapDispatchToProps = {
  signUp,
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const SignUpSuccessModal = ({ open, signUpMessage }) => {
  const [isOpen, setIsOpen] = useState(open);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(Boolean(open));
  }, [open]);
  return (
    <Modal open={isOpen}>
      <Box
        p={(5, 10)}
        pt={4}
        component={Paper}
        maxWidth="70ch"
        position="relative"
      >
        <Box position="absolute" top={10} right={10}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography align="center" variant="h4">
          Welcome to Mehdiabad Farming Coperative Society lmt.
        </Typography>
        <Divider />
        <Typography gutterBottom />

        <Typography variant="subtitle1">
          {signUpMessage}&nbsp;Please Check your &nbsp;
          <a
            href="https://mail.google.com/mail"
            rel="noreferrer"
            target="_blank"
          >
            Gmail
          </a>
          &nbsp; and follow the steps to verify and active your account.
          <br />
          Thank you.
        </Typography>
      </Box>
    </Modal>
  );
};
