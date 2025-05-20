import { fade, makeStyles } from "@material-ui/core/styles";

const drawerWidth = 265;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .header": {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.main,
      background: theme.palette.secondary.main,
      [theme.breakpoints.up("sm")]: {
        paddingLeft: theme.spacing(4.5),
        paddingRight: theme.spacing(4.5),
      },
      [theme.breakpoints.up("md")]: {
        position: "fixed",
        width: "100%",
        margin: 0,
        top: 0,
        paddingLeft: theme.spacing(1),
      },
    },
  },

  fixIconPosition: {
    [theme.breakpoints.up("md")]: { paddingLeft: 0 },
  },
  grow: {
    flexGrow: 1,
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  drawer: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7) + 1,
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },

  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  navLink: {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },

  appTitle: {
    display: "flex",
    alignItems: "center",
    textTransform: "capitalize",

    "& .logo": {
      [theme.breakpoints.up("sm")]: {
        fontSize: "2.19rem",
      },
      fontSize: "2rem",
      marginRight: theme.spacing(0.8),
    },
    "& .title": {
      [theme.breakpoints.up("sm")]: {
        fontSize: "1.25rem",
      },
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      fontSize: "1rem",
    },
  },

  navMenu: {
    display: "flex",
    alignItems: "center",
    "& .menu-item": {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      cursor: "pointer",
    },

    "& .menu-item > p": {
      transition: theme.transitions.create("all"),
      color: theme.palette.primary.main,
    },

    "& .menu-item:hover > p": {
      color: fade(theme.palette.primary.main, 0.6),
    },
  },
}));
