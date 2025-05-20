import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: "100%",
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
    },
    fontSize: "1.1rem",
    fontWeight: 600,
  },
  text: {
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.125rem",
    },
    fontSize: "1rem",
    paddingTop: 5,
  },
}));
