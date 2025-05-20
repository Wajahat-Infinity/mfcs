import { Drawer as MuiDrawer, makeStyles } from "@material-ui/core/";
import clsx from "clsx";

export default function Drawer(props) {
  const { open } = props;
  const classes = useStyles();
  return (
    <MuiDrawer
      className={classes.root}
      classes={{
        paper: clsx({
          [classes.showDrawer]: open,
          [classes.hideDrawer]: !open,
        }),
      }}
      {...props}
    >
      {props.children}
    </MuiDrawer>
  );
}

const drawerWidth = 265;
const useStyles = makeStyles((theme) => ({
  root: {
    " & .MuiDrawer-paper": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    whiteSpace: "nowrap",
    overflowX: "hidden",
  },
  hideDrawer: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0,
  },
  showDrawer: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: drawerWidth,
  },
}));
