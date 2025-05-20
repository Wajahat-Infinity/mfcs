import { Divider, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./styles";

const Service = ({ imgSrc, title, description, isReverse }) => {
  const classes = useStyles();

  return (
    <Paper className={`${classes.root} ${isReverse && classes.reverseImg}`}>
      <div className="text">
        <Typography className="title" variant="h2">
          {title}
        </Typography>
        <Divider />
        <Typography className={classes.para}>{description} </Typography>
      </div>
      <div
        className="image"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </Paper>
  );
};

export default Service;
