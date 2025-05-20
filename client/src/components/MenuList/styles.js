import { fade, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  menuItem: {
    "&:hover": {
      background: fade(theme.palette.primary.main, 0.2),
    },
    "& p": {
      fontSize: "1.05rem",
      marginLeft: -10,
    },
  },
  menuItemIcon: {
    color: theme.palette.primary.main,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));
