import { Container, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import HeaderTab from "../../units/Tabs/HeaderTab";
import SidebarTab from "../../units/Tabs/SidebarTab";
import Paper from "../../units/Paper";
import { useStyles } from "./styles";
import Divider from "../../units/Divider";
import {
  a11yProps,
  CropsSuggestionsForm,
  FertilizerSuggestionsForm,
  TabPanel,
} from "./units";
import { CropHistory, FertilizerHistory } from "./HistoryPanels";
import { useDispatch, useSelector } from "react-redux";
import { resetStore } from "../../Redux/Actions/Predictions";

const Prediction = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    Auth: { isUserSignedIn },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    return dispatch(resetStore());
  }, [dispatch]);
  return (
    <React.Fragment>
      <HeaderTab />
      <SidebarTab>
        <Container className={classes.container}>
          <Paper className={classes.paper}>
            <Typography variant="h5" className="title">
              Prediction Module
            </Typography>
            <Divider />

            <Paper>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                className={classes.tabs}
              >
                <Tab label="Crop Suggestion" {...a11yProps(0)} />
                <Tab label="Fertilizer Suggestion" {...a11yProps(1)} />
                {isUserSignedIn && (
                  <Tab label="History Crop Suggestions" {...a11yProps(2)} />
                )}
                {isUserSignedIn && (
                  <Tab
                    label="History Fertilizer Suggestions"
                    {...a11yProps(3)}
                  />
                )}
              </Tabs>
            </Paper>

            <TabPanel value={value} index={0}>
              <CropsSuggestionsForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <FertilizerSuggestionsForm />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <CropHistory />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <FertilizerHistory />
            </TabPanel>
          </Paper>
        </Container>
      </SidebarTab>
    </React.Fragment>
  );
};

export default Prediction;
