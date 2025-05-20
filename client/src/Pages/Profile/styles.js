import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 5,
      paddingRight: 5,
    },
  },
  rootPaper: {
    padding: 0,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(5),
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(5),
      paddingTop: theme.spacing(2),
    },
    "& .pageTitleContainer": {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 10,
        paddingTop: 10,
      },
    },
  },
  userTitle: {
    display: "flex",
    alignItems: "center",
  },

  iconPaper: {
    boxShadow: "0px 0px 8px 0px " + theme.palette.primary.main,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10,
      marginRight: 10,
    },
  },
  detailsPaper: {
    boxShadow: "0px 0px 8px 0px #26262663",
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(5),
      paddingLeft: theme.spacing(30),
      paddingRight: theme.spacing(30),
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
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

  paper: {
    padding: theme.spacing(3, 1.2),
    minWidth: 200,
    width: "100%",
    maxWidth: 300,
    height: "100%",
    maxHeight: 180,
    "& .divider": {
      margin: theme.spacing(1, 0, 2),
    },
    "& .title": {
      fontSize: 24,
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
