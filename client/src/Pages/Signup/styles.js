import { fade, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      minWidth: "80vw",
      maxWidth: "80vw",
      overflow: "hidden",
    },
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),

    margin: "auto",
    height: "100%",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

  title: {
    color: theme.palette.primary.main,
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: "2rem",
    letterSpacing: -3,
    paddingBottom: theme.spacing(4),
  },

  submitButtonContainer: {
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
  },
  signupButton: {
    width: "100%",
    textTransform: "capitalize",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.9),
    },
  },
  loginLink: {
    color: theme.palette.primary.main,
    paddingTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "& .text": {
      color: "inherit",
    },
    "& a": {
      color: "#556EE6",
      cursor: "pointer",
    },
  },

  aAuthIcons: {
    paddingTop: theme.spacing(2),
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

  successTitle: {
    color: "green",
    fontSize: 16,
    padding: "5px 15px",
    borderRadius: 3,
    width: "fit-content",
    position: "relative",
    margin: "10px auto",
    textAlign: "center",
    "& a": {
      textDecoration: "none",
      color: "inherit",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
}));
