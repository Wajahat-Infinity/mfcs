import React, { useEffect, useCallback } from "react";
import { Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { InputField } from "../../units/FormUnits";
import { signIn } from "../../Redux/Actions/Auth";
import Paper from "../../units/Paper";
import { useStyles } from "./styles";
import { ProgressButton } from "../../units/Button";
import SocialLogin from "../SocialLogIn";

// validation Using Yup
const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required.")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
      "Invalid Email. Please check it again."
    ),
  password: yup.string().required("Password is required"),
});

const SigninForm = (props) => {
  const classes = useStyles();
  const {
    signIn,
    handleSignInClose,
    isUserSignedIn,
    isSignInLoadingFailed,
    signInErrorMessage,
    handleForgetPassword,
  } = props;
  const history = useHistory();
  const handleSignInSuccess = useCallback(() => {
    handleSignInClose();
    const path = "/dashboard";
    history.push(path);
  }, [handleSignInClose, history]);

  useEffect(() => {
    if (isUserSignedIn) handleSignInSuccess();
  }, [isUserSignedIn, handleSignInSuccess]);

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (isSignInLoadingFailed)
      enqueueSnackbar(signInErrorMessage, { variant: "error" });
  }, [isSignInLoadingFailed, signInErrorMessage, enqueueSnackbar]);

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="h2">
        Sign In
      </Typography>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          await signIn(data);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              placeholder="Enter Email"
              width={true}
              name="email"
              type="email"
            />
            <InputField
              placeholder="Enter Password"
              width={true}
              type="password"
              name="password"
            />

            <div className={classes.submitButtonContainer}>
              <ProgressButton
                disabled={isSubmitting}
                className={classes.loginButton}
                type="submit"
                loading={isSubmitting}
              >
                SIGNIN
              </ProgressButton>
            </div>
          </Form>
        )}
      </Formik>
      <div className={classes.forgetPassContainer}>
        <button onClick={handleForgetPassword} className={classes.forgetPass}>
          Forget Password ?
        </button>
      </div>
      <div className={classes.signUpLink}>
        <Typography className={classes.sub}>Don't have an account?</Typography>
        <>
          <RouterLink to="/signup">
            <Typography
              onClick={handleSignInClose}
              style={{ color: "#556EE6" }}
            >
              Join Us
            </Typography>
          </RouterLink>
        </>
        <Typography className={classes.subText}>or</Typography>
      </div>
      <SocialLogin />
    </Paper>
  );
};

const mapStateToProps = (state) => {
  const { Auth } = state;
  return {
    ...Auth,
  };
};
const mapDispatchToProps = { signIn };

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
