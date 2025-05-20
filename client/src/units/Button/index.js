import {
  Button as MuIButton,
  CircularProgress,
  fade,
  makeStyles,
  withStyles,
} from "@material-ui/core";

export const Button = withStyles((theme) => ({
  root: {
    textTransform: "initial",
    boxShadow: "0 0 5px 0" + theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.9),
    },
  },
}))(MuIButton);

export default Button;

export const ProgressButton = (props) => {
  const classes = makeStyles((theme) => ({
    wrapper: {
      margin: theme.spacing(1),
      position: "relative",
      width: "100%",
    },

    buttonProgress: {
      color: theme.palette.secondary.main,
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
      borderRadius: 10,
    },
  }))();
  const { loading } = props;
  return (
    <div className={classes.wrapper}>
      <Button {...props} />
      {loading && (
        <CircularProgress size={25} className={classes.buttonProgress} />
      )}
    </div>
  );
};
