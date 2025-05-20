import React, { useEffect, useState } from "react";
import { dateFormatter, useScrollToTop } from "../../Utilites";
import { Container, Grid, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import Divider from "../../units/Divider";
import Paper from "../../units/Paper";
import UserNameIcon from "../../units/UserNameIcon";
import Details from "../../units/Details";
import HeaderTab from "../../units/Tabs/HeaderTab";
import SidebarTab from "../../units/Tabs/SidebarTab";
import { Modal as ProfileModal } from "../../units/Modal";
import Button from "../../units/Button";
import { InputField } from "../../units/FormUnits";
import { updateProfile } from "../../Redux/Actions/Auth";
import { useStyles } from "./styles";
import { useSnackbar } from "notistack";
import ResetPasswordForm from "../../units/PasswordRest";
import { checkCurrentPassword, updatePassword } from "../../HTTP/Api";

const Profile = ({
  isProfileUpdating,
  message,
  currentUser,
  updateProfile,
}) => {
  const { first_name, last_name, username, email, address, reg_date } =
    currentUser;
  const classes = useStyles();
  useScrollToTop();

  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [currentValues, setCurrentValues] = useState({
    title: null,
    name: null,
    value: null,
  });
  const handleEditProfileOpen = (title, name, value) => {
    setCurrentValues({ title, name, value });
    setOpenEditProfileModal(true);
  };
  const handleEditProfileClose = () => {
    setOpenEditProfileModal(false);
  };

  const handleSubmit = (data) => {
    const values = {
      firstname: first_name,
      lastname: last_name,
      username,
      address,
      ...data,
    };
    let fd = new FormData();
    Object.keys(values).forEach((key) => {
      fd.append(key, values[key]);
    });
    updateProfile(fd);
  };

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (!isProfileUpdating && message) {
      enqueueSnackbar(message, { variant: "success" });
    }
  }, [isProfileUpdating, message, enqueueSnackbar]);

  const handlePasswordChange = async (e, setState) => {
    const { name, value } = e.target;
    if (name === "currentPass") {
      let fd = new FormData();
      fd.append("password", value);
      try {
        const res = await checkCurrentPassword(fd);
        setState(res.data);
      } catch (e) {
        setState({
          success: false,
          message: "Failed to validate password.",
        });
      }
    }
  };
  const handlePasswordSubmit = async (data) => {
    const { confirmPass, pass } = data;

    let fd = new FormData();
    fd.append("password", pass);
    fd.append("confirmPassword", confirmPass);
    try {
      const res = await updatePassword(fd);
      const { success, message } = res.data;
      if (success) {
        enqueueSnackbar(message, { variant: "success" });
      } else {
        enqueueSnackbar(message, { variant: "error" });
      }
    } catch (error) {}
  };
  return (
    <React.Fragment>
      <HeaderTab />
      <SidebarTab>
        <Container className={classes.container}>
          <Paper className={classes.rootPaper}>
            <div className="pageTitleContainer">
              <Typography variant="h5">Profile</Typography>
              <Divider
                style={{
                  margin: 0,
                  marginTop: 3,
                  paddingTop: 1,
                  paddingBottom: 1,
                }}
              />
            </div>

            <Paper className={classes.iconPaper}>
              <UserNameIcon title={username} />

              <Typography variant="h5" className={classes.userTitle}>
                <PersonIcon />
                {username}
              </Typography>
            </Paper>

            <Divider />

            <Paper className={classes.detailsPaper}>
              <Typography variant="h5">Update Details</Typography>
              <Divider />

              <Grid container spacing={2} style={{ marginTop: 25 }}>
                <Grid item md={6} sm={12} xs={12}>
                  <Details
                    title="First Name"
                    subTitle={first_name}
                    isEditable
                    onEditClick={() => {
                      handleEditProfileOpen(
                        "First Name",
                        "firstname",
                        first_name
                      );
                    }}
                  />
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <Details
                    title="Last Name"
                    subTitle={last_name}
                    isEditable
                    onEditClick={() => {
                      handleEditProfileOpen("Last Name", "lastname", last_name);
                    }}
                  />
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <Details
                    title="Username"
                    isEditable
                    subTitle={username}
                    onEditClick={() => {
                      handleEditProfileOpen("Username", "username", username);
                    }}
                  />
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <Details title="Email" subTitle={email} />
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <Details
                    title="Address"
                    subTitle={address}
                    isEditable
                    onEditClick={() => {
                      handleEditProfileOpen("Address", "address", address);
                    }}
                  />
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <Details
                    title="Account Created Date"
                    subTitle={dateFormatter(reg_date)}
                  />
                </Grid>
              </Grid>

              <Divider style={{ margin: "25px 0", paddingTop: 4 }} />
              <ResetPasswordForm
                isUpdatePassword
                handleChange={handlePasswordChange}
                handleSubmit={handlePasswordSubmit}
              />
            </Paper>
          </Paper>
        </Container>
      </SidebarTab>

      <ProfileModal
        open={openEditProfileModal}
        onClose={handleEditProfileClose}
      >
        <EditItem
          currentValues={currentValues}
          handleEditProfileClose={handleEditProfileClose}
          handleSubmit={handleSubmit}
        />
      </ProfileModal>
    </React.Fragment>
  );
};

const mapStateToProp = (state) => {
  const { Auth } = state;
  return {
    currentUser: Auth.currentUser,
    message: Auth.updateProfileMessage,
    isProfileUpdating: Auth.isProfileUpdating,
  };
};
const mapDispatchToProps = {
  updateProfile,
};
export default connect(mapStateToProp, mapDispatchToProps)(Profile);

const EditItem = ({
  currentValues,
  handleEditProfileClose,
  handleSubmit = () => {},
}) => {
  const { name, value, title } = currentValues;
  const inputValidationSchema =
    name === "username"
      ? yup.object({
          username: yup
            .string()
            .required("Username is requried.")
            .matches(
              /^[a-zA-Z0-9_]{3,15}$/,
              "username can only have alphanumeric and _."
            ),
        })
      : yup.object({
          [name]: yup.string().required(`${title}  is required.`),
        });
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Formik
        initialValues={{ [name]: value }}
        validationSchema={inputValidationSchema}
        onSubmit={(data) => {
          handleSubmit(data);
          handleEditProfileClose();
        }}
      >
        <Form>
          <Typography variant="h5" className="title">
            {` Edit ${title}`}
          </Typography>
          <Divider className="divider" />
          <InputField
            placeholder={`${title}`}
            className={classes.inputField}
            type="text"
            name={`${name}`}
            autoFocus
          />

          <div className={classes.buttons}>
            <Button type="submit">Confrim</Button>
            &nbsp;
            <Button onClick={handleEditProfileClose}>Cancel</Button>
          </div>
        </Form>
      </Formik>
    </Paper>
  );
};
