import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "inline-block",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  root: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      width: "fit-content",
      alignItems: "center",
      flexDirection: "row",
    },
  },

  userIconContainer: {
    [theme.breakpoints.down("sm")]: {
      alignSelf: "center",
    },
  },

  icon: {
    marginRight: theme.spacing(0.7),
  },
  title: {
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
    fontSize: "1.3rem",
  },
  textSection: {
    color: theme.palette.primary.main,
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingTop: 0,
    },
  },
  subTitle: {
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
  },
}));
