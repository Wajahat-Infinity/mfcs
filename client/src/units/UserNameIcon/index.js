import { makeStyles } from "@material-ui/core";

const UserNameIcon = ({ title, hasRightSpace = false }) => {
  const classes = useStyles();

  if (title.length > 1) {
    title = title[0];
  }
  return (
    <div
      className={`${classes.profileIcon} ${
        hasRightSpace && classes.rightMargin
      } `}
    >
      <h1 className={classes.text}>{title} </h1>
      <div className="activeDot" />
    </div>
  );
};

export default UserNameIcon;

const useStyles = makeStyles((theme) => ({
  rightMargin: {
    marginRight: 0,
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(2),
    },
  },
  profileIcon: {
    position: "relative",
    background: "#baccb5",
    width: 70,
    height: 70,
    padding: theme.spacing(3),
    borderRadius: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #00a5e4",

    "& .activeDot": {
      padding: 9,
      background: "#2ee400",
      position: "absolute",
      bottom: 0,
      right: 0,
      borderRadius: "100%",
    },
  },
  text: {
    textTransform: "initial",
    color: "#262626",
  },
}));
