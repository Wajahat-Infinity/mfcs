import React from "react";
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ViewListIcon from "@material-ui/icons/ViewList";
import DataOverview from "../../units/DataOverview";
import BarChart from "../../components/BarChart";
import ModuleSubMenu from "../../units/ModuleSubMenu";
import HeaderTab from "../../units/Tabs/HeaderTab";
import SidebarTab from "../../units/Tabs/SidebarTab";
import { connect } from "react-redux";
import {
  useExtractLableAndDatasetForLivestock,
  useFetchSummaryData,
} from "../../Utilites";

import Divider from "../../units/Divider";
import Paper from "../../units/Paper";
import { useStyles } from "./styles";

const Livestock = ({ livestockSummary }) => {
  const classes = useStyles();

  useFetchSummaryData();
  const [livestockChartDataset, livestockChartLable] =
    useExtractLableAndDatasetForLivestock(livestockSummary.data);
  return (
    <React.Fragment>
      <HeaderTab />
      <SidebarTab>
        <Container className={classes.container}>
          <Paper className={classes.rootPaper}>
            <Typography variant="h5">Livestock Management</Typography>
            <Divider
              style={{
                margin: 0,
                marginTop: 3,
                paddingTop: 1,
                paddingBottom: 1,
              }}
            />

            <Grid container spacing={2} className={classes.gridContainer}>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <ModuleSubMenu mainTitle="Livestock Menu">
                  <List>
                    <Link to="/livestock/categories" className="nav-link">
                      <ListItem button className="menu-item">
                        <ListItemIcon
                          aria-label="manage livestock categories "
                          className="menu-item-icon"
                        >
                          <ViewListIcon className="icon" />
                        </ListItemIcon>
                        <p>Manage Livestock Categories</p>
                      </ListItem>
                    </Link>

                    <Link to="/livestock/animals" className="nav-link">
                      <ListItem button className="menu-item">
                        <ListItemIcon
                          aria-label="manage livestock data "
                          className="menu-item-icon"
                        >
                          <ViewListIcon className="icon" />
                        </ListItemIcon>
                        <p>Manage Livestock </p>
                      </ListItem>
                    </Link>
                  </List>
                </ModuleSubMenu>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <DataOverview
                  title="Livestock Details"
                  subTitleOne={`Total Categories: ${livestockSummary.totalCategories}`}
                  subTitleTwo={`Total Animals: ${livestockSummary.totalAnimals}`}
                />
              </Grid>
            </Grid>
            <Divider />
            <div className={classes.chartContainer}>
              <BarChart
                title="Data Overview"
                label="Animals"
                yAxesLabel="Animals"
                xAxesLabel="Categories"
                data={livestockChartDataset}
                labels={livestockChartLable}
                backgroundColor="#d5cefc"
                borderColor="#1f01ff"
              />
            </div>
          </Paper>
        </Container>
      </SidebarTab>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { Dashboard } = state;
  return {
    livestockSummary: Dashboard.livestockSummary,
  };
};
export default connect(mapStateToProps)(Livestock);
