import { makeStyles } from "@material-ui/core";

const SidebarTab = (props) => {
  const classes = useStyles();
  return <div className={classes.root}>{props.children}</div>;
};

export default SidebarTab;

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    margin: 0,
    [theme.breakpoints.up('md')]:{
      paddingLeft: theme.spacing(5),
      flexGrow: 1,

    }

  },
}));
