import { IconButton, makeStyles, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "../Paper";
import Divider from "../Divider";

const Details = (props) => {
  const {
    title = "",
    subTitle = "",
    isEditable = false,
    onEditClick = () => {},
  } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.heading}>
        <Typography className={classes.title}>{title}</Typography>
        {isEditable && (
          <IconButton className={classes.button} onClick={onEditClick}>
            <EditIcon />
          </IconButton>
        )}
      </div>
      <Divider />
      <Typography className="subTitle">{subTitle}</Typography>
      {props.children}
    </Paper>
  );
};

export default Details;

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0px 0px 8px 0px " + theme.palette.primary.main,
    padding: theme.spacing(1, 2),
    color: theme.palette.primary.main,

    "& .subTitle": {
      color: theme.palette.primary.main,
      [theme.breakpoints.up("sm")]: {
        fontSize: "1.1rem",
      },
      fontSize: "1rem",
      fontWeight: 600,
      paddingTop: 5,
    },
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: theme.palette.primary.main,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.125rem",
    },
    fontSize: "1rem",
    paddingBottom: 5,
  },

  button: {
    padding: 0,
    paddingBottom: 5,
  },
}));
