import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Form, Formik } from "formik";
import HeaderTab from "../units/Tabs/HeaderTab";
import SidebarTab from "../units/Tabs/SidebarTab";
import Divider from "../units/Divider";
import { InputField } from "../units/FormUnits";
import Button from "../units/Button";
import Paper from "../units/Paper";
import { connect } from "react-redux";
import { getCode, postPasswordReset } from "../Redux/Actions/PasswordReset";
import { useTostMessage } from "../Utilites";

const PasswordReset = ({
  isPasswordUpdating,
  isPasswordUpdatingFailed,
  message,
  isCodeLoading,
  data,
  getCode,
  postPasswordReset,
}) => {
  const { token } = useParams();
  const classes = useStyles();

  useEffect(() => {
    getCode(token);
  }, [getCode, token]);

  const validationSchema = yup.object({
    vCode: yup.number("").required("Verification code is required"),
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

  useTostMessage(isPasswordUpdating, isPasswordUpdatingFailed, message);

  return (
    <React.Fragment>
      <HeaderTab />
      <SidebarTab>
        <Container className={classes.container}>
          {isCodeLoading ? (
            <p>Loading...</p>
          ) : (
            <Paper className={classes.rootPaper}>
              <Typography variant="h5">Reset Password</Typography>
              <Divider />

              <Formik
                initialValues={{
                  vCode: data.code || "",
                  pass: "",
                  confirmPass: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (
                  data,
                  { setSubmitting, resetForm, setFieldValue }
                ) => {
                  setSubmitting(true);
                  let fd = new FormData();
                  fd.append("vCode", data.vCode);
                  fd.append("pass", data.pass);
                  fd.append("confirmPass", data.confirmPass);

                  await postPasswordReset(fd);
                  setSubmitting(false);
                  resetForm({ data: "" });
                  setFieldValue("vCode", "");
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Grid container style={{ marginTop: 25 }} spacing={1}>
                      <Grid item xs={12}>
                        <InputField
                          placeholder="Verification Code"
                          className={classes.inputField}
                          type="number"
                          name="vCode"
                        />
                      </Grid>
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

                      <Grid item sm={5} xs={12}>
                        <Button fullWidth type="submit" disabled={isSubmitting}>
                          Confirm New Password
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Paper>
          )}
        </Container>
      </SidebarTab>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  const { PasswordReset } = state;
  return {
    ...PasswordReset,
  };
};
const mapDispatchToProps = { postPasswordReset, getCode };
export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 20),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 5,
      paddingRight: 5,
    },
  },
  rootPaper: {
    minHeight: "80vh",
    padding: theme.spacing(5, 10),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 4),
    },
  },
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
