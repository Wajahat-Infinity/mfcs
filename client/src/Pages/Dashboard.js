import React from "react";
import { Typography } from "@material-ui/core";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BarChart from "../components/BarChart";
import UserCard from "../units/UserCard";
import DataOverview from "../units/DataOverview";
import HeaderTab from "../units/Tabs/HeaderTab";
import SidebarTab from "../units/Tabs/SidebarTab";
import {
  useExtractLableAndDatasetForFarmChemicals,
  useExtractLableAndDatasetForInventory,
  useExtractLableAndDatasetForLivestock,
  useFetchSummaryData,
  useScrollToTop,
} from "../Utilites";
import Paper from "../units/Paper";
import Divider from "../units/Divider";

const Dashboard = ({
  Auth: {
    currentUser: { first_name, last_name, email, reg_date },
  },
  livestockSummary,
  farmChemicalsSummary,
  inventorySummary,
}) => {
  const classes = useStyles();
  useScrollToTop();

  useFetchSummaryData();

  const [livestockChartDataset, livestockChartLable] =
    useExtractLableAndDatasetForLivestock(livestockSummary.data);

  const [inventoryChartDataset, inventoryChartLable] =
    useExtractLableAndDatasetForInventory(inventorySummary.data);

  const [farmChemicalsChartDataset, farmChemicalsChartLable] =
    useExtractLableAndDatasetForFarmChemicals(farmChemicalsSummary.data);
  return (
    <React.Fragment>
      <HeaderTab />
      <SidebarTab>
        <Container className={classes.container}>
          <Paper className={classes.rootPaper}>
            <Grid container spacing={2} className={classes.outerPaper}>
              <Grid item xs={12} style={{ paddingTop: 0 }}>
                <Paper
                  style={{
                    boxShadow: "none",
                    padding: 10,
                  }}
                >
                  <Typography variant="h5">Dashboard</Typography>
                  <Divider
                    style={{
                      margin: 0,
                      marginTop: 3,
                      paddingTop: 1,
                      paddingBottom: 1,
                    }}
                  />
                  <Link to={"/profile"} className={classes.link}>
                    <UserCard
                      name={`${first_name} ${last_name}`}
                      email={email}
                      joinedDate={reg_date}
                    />
                  </Link>
                  <Divider />
                  <Grid
                    container
                    spacing={1}
                    className={classes.dataOverviewContainer}
                  >
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Link to={"/farmchemicals"} className={classes.link}>
                        <DataOverview
                          title="Farm Chemical Details"
                          subTitleOne={`Total Categories: ${farmChemicalsSummary.totalCategories}`}
                          subTitleTwo={`Total Chemicals: ${farmChemicalsSummary.totalChemicals}`}
                        />
                      </Link>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Link to={"/livestock"} className={classes.link}>
                        <DataOverview
                          title="Livestock Details"
                          subTitleOne={`Total Categories: ${livestockSummary.totalCategories}`}
                          subTitleTwo={`Total Animals: ${livestockSummary.totalAnimals}`}
                        />
                      </Link>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Link to={"/inventory"} className={classes.link}>
                        <DataOverview
                          title="Inventory Details"
                          subTitleOne={`Total Categories: ${inventorySummary.totalCategories}`}
                          subTitleTwo={`Total Inventory Items: ${inventorySummary.totalItems}`}
                        />
                      </Link>
                    </Grid>
                  </Grid>
                  <Divider style={{ marginTop: 10 }} />
                </Paper>
              </Grid>

              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <BarChart
                  title="Livestock"
                  label="Animals"
                  yAxesLabel="Animals"
                  xAxesLabel="Categories"
                  data={livestockChartDataset}
                  labels={livestockChartLable}
                  backgroundColor="#d5cefc"
                  borderColor="#1f01ff"
                />
              </Grid>

              <Grid item xs={12}>
                <BarChart
                  title="Inventory"
                  label="Items"
                  yAxesLabel="Items"
                  xAxesLabel="Categories"
                  data={inventoryChartDataset}
                  labels={inventoryChartLable}
                  backgroundColor="#d3ebfa"
                  borderColor="#52a2ec"
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </SidebarTab>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { Auth, Dashboard } = state;
  return {
    Auth,
    ...Dashboard,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 5,
      paddingRight: 5,
    },
  },
  rootPaper: {
    minHeight: "80vh",
  },
  outerPaper: {
    "& .MuiGrid-item:last-child": {
      paddingBottom: 0,
    },
  },
  gridItem: {
    height: 400,
  },
  dataOverviewContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    position: "relative",
    top: 0,
    transition: " top 300ms",

    "&:hover": {
      top: -5,
    },
  },
}));
