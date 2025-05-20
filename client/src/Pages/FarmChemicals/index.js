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
import React from "react";
import HeaderTab from "../../units/Tabs/HeaderTab";
import SidebarTab from "../../units/Tabs/SidebarTab";
import { connect } from "react-redux";
import {
  useExtractLableAndDatasetForFarmChemicals,
  useFetchSummaryData,
} from "../../Utilites";
import Divider from "../../units/Divider";
import Paper from "../../units/Paper";
import { useStyles } from "./styles";

const FarmChemicals = ({ farmChemicalsSummary }) => {
  const classes = useStyles();
  useFetchSummaryData();

  const [farmChemicalsChartDataset, farmChemicalsChartLable] =
    useExtractLableAndDatasetForFarmChemicals(farmChemicalsSummary.data);
  return (
    <React.Fragment>
      <HeaderTab />
      <SidebarTab>
        <Container className={classes.container}>
          <Paper className={classes.rootPaper}>
            <Typography variant="h5">Farm Chemiclas</Typography>
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
                <ModuleSubMenu mainTitle="Chemiclas Menu">
                  <List>
                    <Link to="/farmchemicals/categories" className="nav-link">
                      <ListItem button className="menu-item">
                        <ListItemIcon
                          aria-label="manage chemicals categories "
                          className="menu-item-icon"
                        >
                          <ViewListIcon className="icon" />
                        </ListItemIcon>
                        <p>Manage Chemicals Categories</p>
                      </ListItem>
                    </Link>
                    <Link to="/farmchemicals/chemicals" className="nav-link">
                      <ListItem button className="menu-item">
                        <ListItemIcon
                          aria-label="Manage chemicals "
                          className="menu-item-icon"
                        >
                          <ViewListIcon className="icon" />
                        </ListItemIcon>
                        <p>Manage Chemicals</p>
                      </ListItem>
                    </Link>
                  </List>
                </ModuleSubMenu>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <DataOverview
                  title="Farm Chemical Details"
                  subTitleOne={`Total Categories: ${farmChemicalsSummary.totalCategories}`}
                  subTitleTwo={`Total Chemicals: ${farmChemicalsSummary.totalChemicals}`}
                />
              </Grid>
            </Grid>
            <Divider />
            <div className={classes.chartContainer}>
              <BarChart
                title="Farm Chemicals"
                label="Chemicals"
                yAxesLabel="Chemicals"
                xAxesLabel="Categories"
                data={farmChemicalsChartDataset}
                labels={farmChemicalsChartLable}
                backgroundColor="#f9dee5"
                borderColor="#e96082"
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
    farmChemicalsSummary: Dashboard.farmChemicalsSummary,
  };
};
export default connect(mapStateToProps)(FarmChemicals);
