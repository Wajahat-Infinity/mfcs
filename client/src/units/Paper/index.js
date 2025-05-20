import { makeStyles, Paper as MuiPaper } from "@material-ui/core";
import cn from "classnames";
export const Paper = ({ children, className = null, style = null }) => {
  const classes = useStyles();
  const paperClasses = cn(className, classes.root);
  return (
    <MuiPaper style={style} className={paperClasses}>
      {children}
    </MuiPaper>
  );
};

export default Paper;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: "0px 0px 4px " + theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}));
