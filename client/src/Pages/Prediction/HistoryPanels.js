import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCropHistory, getHistory } from "../../Redux/Actions/Predictions";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./styles";
import Divider from "../../units/Divider";
import { dateFormatter } from "../../Utilites";
import { getCityName } from "./units";

export const FertilizerHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    Predictions: {
      isLoadingHistory,
      isLoadingHistoryFailed,
      fertilizerHistory,
    },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  if (isLoadingHistoryFailed)
    return (
      <Typography color="error">An error occurred. please try again</Typography>
    );

  return (
    <>
      {isLoadingHistory && (
        <div className={classes.loaderContainer}>
          <CircularProgress />
        </div>
      )}

      <div>
        {fertilizerHistory.map(
          ({
            create_at,
            crop,
            f_id,
            nitrogen,
            pH,
            phosphorous,
            potassium,
            suggestion,
          }) => (
            <Accordion className={classes.accordian} key={f_id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="text">
                  {dateFormatter(create_at)}
                </Typography>
                &nbsp;&nbsp;&nbsp;
                <Typography className="text">
                  NPK ({nitrogen}, {phosphorous}, {potassium}), pH ({pH}),
                  Crop&nbsp;({crop})
                </Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <div>
                  <Typography gutterBottom className="text" variant="h6">
                    System Suggesion:
                  </Typography>
                  <Typography
                    className="text"
                    dangerouslySetInnerHTML={{ __html: suggestion }}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          )
        )}
      </div>
    </>
  );
};

export const CropHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    Predictions: { isLoadingHistory, isLoadingHistoryFailed, cropHistory },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getCropHistory());
  }, [dispatch]);

  if (isLoadingHistoryFailed)
    return (
      <Typography color="error">An error occurred. please try again</Typography>
    );

  return (
    <>
      {isLoadingHistory && (
        <div className={classes.loaderContainer}>
          <CircularProgress />
        </div>
      )}

      <div>
        {cropHistory.map(
          ({
            created_at,
            crop,
            nitrogen,
            pH,
            p_id,
            phosphorous,
            potassium,
            rainfall,
            temperature,
            city_id,
          }) => (
            <Accordion className={classes.accordian} key={p_id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="text">
                  {dateFormatter(created_at)}
                </Typography>
                &nbsp;&nbsp;&nbsp;
                <Typography className="text">
                  NPK ({nitrogen}, {phosphorous}, {potassium}), pH ({pH}), City(
                  {getCityName(city_id)[0]?.city}) Crop&nbsp;({crop})
                </Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <div>
                  <Typography gutterBottom className="text">
                    <em>
                      <b>NOTE:</b>
                    </em>
                    &nbsp; The values of potassium, nitrogen and phosphorous are
                    ratio of content in soil.
                  </Typography>
                  <Typography gutterBottom className="text" variant="h6">
                    Input Values
                  </Typography>

                  <Typography gutterBottom className="text">
                    rainfall&nbsp;({rainfall}mm)&nbsp; temperature&nbsp; (
                    {temperature}&deg;C )&nbsp; nitrogen&nbsp;({nitrogen})&nbsp;
                    pH&nbsp; ({pH})&nbsp; phosphorous&nbsp;({phosphorous})&nbsp;
                    potassium &nbsp;({potassium})&nbsp; City&nbsp;(
                    {getCityName(city_id)[0]?.city})
                  </Typography>

                  <Typography gutterTop className="text" variant="h6">
                    System Suggesion:
                  </Typography>
                  <Typography className="text">
                    Crop: <span dangerouslySetInnerHTML={{ __html: crop }} />
                  </Typography>
                </div>
              </AccordionDetails>
            </Accordion>
          )
        )}
      </div>
    </>
  );
};
