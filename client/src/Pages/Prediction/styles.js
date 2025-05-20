import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 5,
      paddingRight: 5,
    },

    "& p.capitalize": { textTransform: "capitalize" },
    "& .sub-title": {
      color: theme.palette.primary.main,
      textTransform: "capitalize",
    },
  },
  paper: {
    padding: theme.spacing(3, 1.2),
    minWidth: 200,
    width: "100%",

    "& .divider": {
      margin: theme.spacing(1, 0, 2),
    },
    "& .title": {
      fontSize: 24,
    },
  },

  tabs: {
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-around",
    },
  },
  inputField: {
    width: "100%",
  },
  divider: {
    marginTop: 30,
  },

  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  containerInner: {
    "& .text": {
      color: theme.palette.primary.main,
    },

    "& .error": {
      color: "red",
    },
  },

  submitButtonContainer: {
    width: "30%",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      margin: "auto",
    },
  },

  accordian: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: "0px 0px 4px " + theme.palette.primary.main,
    color: theme.palette.primary.main,
    "& .text": {
      color: theme.palette.primary.main,
    },
  },
}));

export default useStyles;
