import { fade, IconButton as MuiButton, makeStyles } from "@material-ui/core";
const ActionButton = (props) => {
  const classes = useStyles();
  const btnClass = props.edit ? classes.edit : classes.delete;
  return (
    <MuiButton {...props} className={btnClass} classes={{ root: classes.root }}>
      {props.children}
    </MuiButton>
  );
};

export default ActionButton;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 5,
  },
  edit: {
    "& .MuiSvgIcon-root": {
      color: "#036303",
    },
    "&:hover": {
      background: fade("#036303", 0.4),
    },
  },

  delete: {
    marginLeft: 15,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
    "& .MuiSvgIcon-root": {
      color: "#d81212",
    },
    "&:hover": {
      background: fade("#d81212", 0.4),
    },
  },
}));
