import React, { useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Divider from "../Divider";
import { InputField } from "../FormUnits";
import { ProgressButton } from "../Button";

const ResetPasswordForm = ({
  isUpdatePassword,
  handleSubmit = () => {},
  handleChange = () => {},
}) => {
  const classes = useStyles();
  const validationSchema = yup.object({
    [isUpdatePassword && "currentPass"]: yup
      .string()
      .required("Current Password is required."),
    pass: yup
      .string()
      .required("New Password is required.")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password should have 8 characters, one uppercase, lowercase, number and a special character."
      ),
    confirmPass: yup
      .string()
      .required("Confirm Password is required.")

      .when("pass", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf(
            [yup.ref("pass")],
            "Confirm password does not match New Password."
          ),
      }),
  });
  const [isValidPassword, setIsValidPassword] = useState({
    success: true,
    message: "",
  });
  const onChange = (e) => {
    handleChange(e, setIsValidPassword);
  };

  return (
    <React.Fragment>
      <Typography variant="h5">Reset Password</Typography>
      <Divider />

      <Formik
        initialValues={{
          currentPass: "",
          pass: "",
          confirmPass: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await handleSubmit(data);
          resetForm({});
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form onChange={onChange}>
            <Grid container style={{ marginTop: 25 }} spacing={1}>
              {isUpdatePassword && (
                <Grid item xs={12}>
                  <InputField
                    placeholder="Current Password"
                    className={classes.inputField}
                    type="password"
                    name="currentPass"
                    error={!isValidPassword.success}
                    helperText={
                      !isValidPassword.success &&
                      "Current Password is Incorrect."
                    }
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <InputField
                  placeholder="New Password"
                  className={classes.inputField}
                  type="password"
                  name="pass"
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  placeholder="Confrim Password"
                  className={classes.inputField}
                  type="password"
                  name="confirmPass"
                />
              </Grid>

              <Grid item sm={3} xs={12}>
                <ProgressButton
                  loading={isSubmitting}
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                >
                  Reset
                </ProgressButton>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
export default ResetPasswordForm;

const useStyles = makeStyles((theme) => ({
  inputField: {
    width: "100%",
    "& input": {
      padding: theme.spacing(1),
    },
    "& .MuiFormHelperText-root": {
      left: 0,
      margin: 0,
    },
  },
}));
