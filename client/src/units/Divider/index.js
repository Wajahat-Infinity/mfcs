import { Divider as MuiDivider, makeStyles } from "@material-ui/core/";

const Divider = (props) => {
  const classes = useStyles();
  return <MuiDivider {...props} className={classes.divider} />;
};

export default Divider;

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: theme.palette.primary.main,
  },
}));
