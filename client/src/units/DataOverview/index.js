import Paper from "../Paper";
import Divider from "../Divider";
import { useStyles } from "./styles";

const DataOverview = ({ title, subTitleOne, subTitleTwo }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.title}>{title}</div>
      <Divider />
      <div className={classes.text} style={{ paddingTop: 10 }}>
        {subTitleOne}
      </div>
      <div className={classes.text}>{subTitleTwo}</div>
    </Paper>
  );
};

export default DataOverview;
