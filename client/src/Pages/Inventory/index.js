import React from "react";
import {
  Container,
  Grid,
  Typography,
  List,
  ListItemIcon,
  ListItem,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ViewListIcon from "@material-ui/icons/ViewList";
import DataOverview from "../../units/DataOverview";
import BarChart from "../../components/BarChart";
import ModuleSubMenu from "../../units/ModuleSubMenu";
import HeaderTab from "../../units/Tabs/HeaderTab";
import SidebarTab from "../../units/Tabs/SidebarTab";
import Divider from "../../units/Divider";
import Paper from "../../units/Paper";
import useScrollToTop, {
  useExtractLableAndDatasetForInventory,
  useFetchSummaryData,
} from "../../Utilites";
import { useStyles } from "./styles";

const Inventory = ({ inventorySummary }) => {
  const classes = useStyles();
  useScrollToTop();
  useFetchSummaryData();
  const [inventoryChartDataset, inventoryChartLable] =
    useExtractLableAndDatasetForInventory(inventorySummary.data);

  return (
    <React.Fragment>
      <HeaderTab />
      <SidebarTab>
        <Container className={classes.container}>
          <Paper className={classes.rootPaper}>
            <Typography variant="h5">Inventory Management</Typography>
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
                <ModuleSubMenu mainTitle="Inventory Menu">
                  <List>
                    <Link to="/inventory/categories" className="nav-link">
                      <ListItem button className="menu-item">
                        <ListItemIcon
                          aria-label=" Manage Inventory
                        Categories "
                          className="menu-item-icon"
                        >
                          <ViewListIcon className="icon" />
                        </ListItemIcon>
                        <p> Manage Inventory Categories</p>
                      </ListItem>
                    </Link>
                    <Link to="/inventory/items" className="nav-link">
                      <ListItem button className="menu-item">
                        <ListItemIcon
                          aria-label="Manage Inventory Items"
                          className="menu-item-icon"
                        >
                          <ViewListIcon className="icon" />
                        </ListItemIcon>
                        <p>Manage Inventory Items</p>
                      </ListItem>
                    </Link>
                  </List>
                </ModuleSubMenu>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <DataOverview
                  title="Inventory Details"
                  subTitleOne={`Total Categories: ${inventorySummary.totalCategories}`}
                  subTitleTwo={`Total Inventory Items: ${inventorySummary.totalItems}`}
                />
              </Grid>
            </Grid>
            <Divider />
            <div className={classes.chartContainer}>
              <BarChart
                title="Data Overview"
                label="Items"
                yAxesLabel="Items"
                xAxesLabel="Categories"
                data={inventoryChartDataset}
                labels={inventoryChartLable}
                backgroundColor="#d3ebfa"
                borderColor="#52a2ec"
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
    inventorySummary: Dashboard.inventorySummary,
  };
};
export default connect(mapStateToProps)(Inventory);
