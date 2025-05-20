import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Typography } from "@material-ui/core";
import * as yup from "yup";
import Paper from "../../units/Paper";
import { InputField } from "../../units/FormUnits";
import { ProgressButton } from "../../units/Button";
import Divider from "../../units/Divider";
import { requestResetPassword } from "../../HTTP/Api";
import { useStyles } from "./styles";

const RequestPassResetForm = ({ handleSignIn = () => {} }) => {
  const classes = useStyles();
  useEffect(() => {
    return handleSignIn;
  }, [handleSignIn]);

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required.")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
        "Invalid Email. Please check it again."
      ),
  });

  const [state, setState] = useState({ success: true, message: "" });
  return (
    <Paper className={classes.root}>
      <Typography
        className={classes.title}
        style={{
          letterSpacing: "normal",
          fontSize: 28,
          paddingBottom: 0,
        }}
        variant="h6"
      >
        Password Reset
      </Typography>
      <Divider />

      <Typography
        className={classes.note}
        style={{
          [state.success && state.message && "color"]: "green",
          [!state.success && "color"]: "red",
        }}
      >
        {state.success && state.message
          ? state.message
          : !state.success
          ? state.message
          : "Please enter your email address for password reset instructions."}
      </Typography>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          let fd = new FormData();
          fd.append("email", data.email);
          try {
            const res = await requestResetPassword(fd);
            resetForm();

            setState(res.data);
          } catch (e) {
            setState(e.response.data);
          }
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <InputField
              placeholder="Enter Email"
              width={true}
              name="email"
              type="email"
              error={!state.success}
            />
            <div className={classes.submitButtonContainer}>
              <ProgressButton
                disabled={isSubmitting}
                className={classes.loginButton}
                type="submit"
                loading={isSubmitting}
              >
                Confirm
              </ProgressButton>
            </div>
          </Form>
        )}
      </Formik>
      <div className={classes.forgetPassContainer}>
        <button onClick={handleSignIn} className={classes.forgetPass}>
          SIGN IN?
        </button>
      </div>
    </Paper>
  );
};

export default RequestPassResetForm;
