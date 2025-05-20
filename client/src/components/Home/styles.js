import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  main: {
    "& .main-image": {
      minHeight: "30vh",
      maxHeight: "100vh",
      width: "100%",
    },
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(0.8),
      paddingRight: theme.spacing(0.8),
    },
  },
  introPaper: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  para: {
    paddingTop: theme.spacing(1.5),
    textAlign: "justify",
  },
  bigHeading: {
    fontSize: "1.9rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.7rem",
    },
  },

  aboutUsPaper: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },

  teamMembersContainer: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },

  teamPaper: {
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    "& .teamHeading": {
      [theme.breakpoints.down("sm")]: {
        paddingBottom: theme.spacing(1),
      },
    },
  },
}));
