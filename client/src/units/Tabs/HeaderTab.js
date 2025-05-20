import { makeStyles } from "@material-ui/core";

const HeaderTab = () => {
  const classes = useStyles();
  return <div className={classes.root} />;
};

export default HeaderTab;

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(6),

    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(8),
    },
  },
}));
