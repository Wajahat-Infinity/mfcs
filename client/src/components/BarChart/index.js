import { Typography, makeStyles, useTheme } from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import Paper from "../../units/Paper";
import Divider from "../../units/Divider";

const BarChart = ({
  title = "",
  labels = [],
  data = [],
  label = "Label",
  yAxesLabel = "",
  xAxesLabel = "",
  borderColor = "#3131ad",
  backgroundColor = "#3131ad",
  fontColor,
  fontFamily,
}) => {
  const classes = useStyles();
  let theme = useTheme();
  fontColor = theme.palette.primary.main;
  fontFamily = theme.typography.fontFamily;

  return (
    <Paper className={classes.root}>
      <Typography variant="h5">{title}</Typography>
      <Divider />
      <Bar
        height={250}
        width={250}
        data={{
          labels: labels,
          datasets: [
            {
              label: label,
              data: data,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1,
              minBarLength: 1,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false, // Don't maintain w/h ratio
          legend: {
            labels: {
              fontColor,
              fontFamily,
            },
          },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: xAxesLabel,
                  fontColor,
                  fontFamily,
                },
                ticks: {
                  beginAtZero: true,
                  fontColor,
                  precision: 0,
                },
                gridLines: {
                  color: fontColor,
                  borderColor: fontColor,
                  fontColor,
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: yAxesLabel,
                  fontColor,
                  fontFamily,
                },
                ticks: {
                  fontFamily,
                  fontColor,
                },
                gridLines: {
                  color: fontColor,
                  borderColor: fontColor,
                  fontColor,
                },
              },
            ],
          },
        }}
      />
    </Paper>
  );
};

export default BarChart;

const useStyles = makeStyles((theme) => ({
  root: {
    height: 600,
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(9),
    [theme.breakpoints.down("sm")]: {
      height: 450,
    },
  },
}));
