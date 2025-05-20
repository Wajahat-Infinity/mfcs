import { fade, makeStyles, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "../Divider";
import Paper from "../Paper";

const ModuleSubMenu = (props) => {
  const { mainTitle } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.subMenuPaper}>
      <Typography variant="h6" className="heading">
        <MenuIcon className="icon" />
        {mainTitle}
      </Typography>
      <Divider />
      {props.children}
    </Paper>
  );
};
export default ModuleSubMenu;

const useStyles = makeStyles((theme) => ({
  subMenuPaper: {
    "& .heading": {
      paddingLeft: 10,
    },
    height: "100%",
    padding: 10,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    "& .MuiTypography-root": {
      color: theme.palette.primary.main,
      display: "flex",
      alignItems: "center",
      "& .icon": {
        marginRight: theme.spacing(1),
      },
    },
    "& .menu-item": {
      paddingLeft: 10,
      "&:hover": {
        background: fade(theme.palette.primary.main, 0.2),
      },
      "& p": {
        fontSize: "1.05rem",

        marginLeft: -20,
      },
    },
    " & .menu-item-icon": {
      "& .MuiSvgIcon-root": {
        color: theme.palette.primary.main,
      },
    },
    "& .nav-link": {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
  },
}));
