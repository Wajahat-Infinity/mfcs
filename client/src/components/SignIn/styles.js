import { fade, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      minWidth: "46ch",
      maxWidth: "46ch",
      padding: theme.spacing(3),
    },
    padding: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: "100%",
  },
  title: {
    color: theme.palette.primary.main,
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: "2rem",
    letterSpacing: -3,
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingBottom: theme.spacing(6),
    },
  },

  submitButtonContainer: {
    marginTop: 0,
    display: "flex",
    justifyContent: "center",
  },

  checkboxContainer: {
    position: "relative",
    top: theme.spacing(-1),
    left: theme.spacing(1),
    "& > span": {
      cursor: "default",
      position: "absolute",
      top: theme.spacing(1),
      left: theme.spacing(3.5),
    },
  },
  loginButton: {
    width: "100%",
    fontWeight: 500,
    textTransform: "capitalize",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.9),
    },
  },
  forgetPassContainer: {
    paddingTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  forgetPass: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    background: "transparent",
    border: "none",
    fontFamily: theme.typography.fontFamily,
    fontSize: 16,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  signUpLink: {
    display: "flex",
    paddingTop: theme.spacing(1),
    alignItems: "center",
    flexDirection: "column",
    "& > p": {
      fontSize: "1r3m",
      cursor: "default",
      color: fade("#556EE6", 0.8),
    },
    "& a": {
      color: "#556EE6",
      cursor: "pointer",
    },
  },
  subText: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    fontWeight: 600,
  },
  aAuthIcons: {
    display: "flex",
    justifyContent: "center",
    "& .google": {
      backgroundColor: "#fff",
    },
    "&> .MuiIconButton-root": {
      padding: 0,
      overflow: "hidden",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      transition: theme.transitions.create(),
      "&:hover": {
        boxShadow: "0px 1px 5px 2px #7e95ff",
      },
    },
  },

  note: {
    color: theme.palette.primary.main,
    fontSize: 16,
    marginBottom: 10,
  },
}));
