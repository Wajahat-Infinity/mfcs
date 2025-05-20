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
    padding: 10,
    minHeight: "80vh",
  },
  subTitle: {
    fontSize: theme.spacing(2.6),
    fontWeight: 500,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  gridContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  chartContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));
