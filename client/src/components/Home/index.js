import React from "react";
import { Container, Paper, Typography, Divider } from "@material-ui/core";
import PersonProfile from "../../units/PersonProfile";
import Service from "../../units/Service";
import { useStyles } from "./styles";
import mainImgSrc from "../../assets/images/homeMain1.jpg";
// import bashirImg from "../../assets/images/bashir.jpg";
import ghImg from "../../assets/images/gh.jpeg";

// import inzamamImg from "../../assets/images/inzamam.jpeg";
import razaImg from "../../assets/images/raza.png";


import farmChemicalImg from "../../assets/images/farmChemical.jpg";
import inventoryImg from "../../assets/images/inventory.jpg";
import livestockImg from "../../assets/images/livestock.jpg";
import machineLearningImg from "../../assets/images/ml.jpg";
import HeaderTab from "../../units/Tabs/HeaderTab";
import SidebarTab from "../../units/Tabs/SidebarTab";
import { Redirect, useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
  const classes = useStyles();
  const { location } = useHistory();
  const { isUserSignedIn } = useSelector((state) => state.Auth);
  if (isUserSignedIn && location.state?.from)
    return <Redirect to={`${location.state.from.pathname}`} />;
  return (
    <React.Fragment>
      <HeaderTab />
      <SidebarTab>
        <div className={classes.main}>
          <img
            src={mainImgSrc}
            alt="lush field and a tractor"
            className="main-image"
          />
        </div>
        <Container className={classes.container}>
          <Paper className={classes.introPaper}>
            <Typography className={classes.bigHeading} variant="h2">
              What is Mehdiabad Farming Coperative Society lmt.?
            </Typography>
            <Typography className={classes.para}>
              Farmers in the past had difficulty selecting the appropriate crop
              for their soil types. Furthermore, in manual form, livestock
              management was an additional problem for farmers. As a result, a
              web application is a current need to assist farmers in selecting
              and identifying appropriate crops and fertilizers for their land
              type. These suggestions will be based on machine learning
              algorithms. In addition to this, it will also automate the farm
              management system for Mehdiabad Farming Coperative Society lmt.
            </Typography>
            <Typography className={classes.para}>
              The proposed services through web applications include; (i)
              suitable crops suggestion based on soil quality and temperature,
              (ii) suggestions for fertilizers , (iii) automated livestock
              management for the farms, (iv) inventory management system and (v)
              farm chemicals management system.
            </Typography>
          </Paper>

          <Divider />

          <Paper className={classes.aboutUsPaper}>
            <Typography className={classes.bigHeading} variant="h2">
              About Us
            </Typography>

            <Link to="/predictions" style={{ textDecoration: 'none' }}>
              <Service
                isReverse
                imgSrc={machineLearningImg}
                title="Prediction System"
                description="With our Prediction system, the user can input his land health details like the number of minerals available in his land. With machine-learning algorithms, we will help them in selecting suitable crops according to their land quality."
              />
            </Link>

            <Link to="/livestock" style={{ textDecoration: 'none' }}>
              <Service
                imgSrc={livestockImg}
                title="Livestock Management"
                description="With our livestock Management system, a registered user can keep track of his livestock. He can record details like animal type, gender, category, and many more."
              />
            </Link>

            <Link to="/farm-chemicals" style={{ textDecoration: 'none' }}>
              <Service
                isReverse
                imgSrc={farmChemicalImg}
                title="Farm Chemicals Management"
                description="With our Farm Chemicals Management system, a registered user can keep track of his farm chemicals. He can record details like chemical type, purchase date, category, and many more."
              />
            </Link>

            <Link to="/inventory" style={{ textDecoration: 'none' }}>
              <Service
                imgSrc={inventoryImg}
                title="Inventory Management"
                description="With our Inventory Management system, a registered user can keep track of his Inventory. He can record details like Inventory type, category, and many more."
              />
            </Link>
          </Paper>

          <Divider />

          <Paper className={classes.teamPaper}>
            <Typography
              className={`${classes.bigHeading} teamHeading`}
              variant="h2"
            >
              Team Members
            </Typography>
            <div className={classes.teamMembersContainer}>
              <PersonProfile
                imgSrc={razaImg}
                name="Muhammad Raza"
                description="Muhammad Raza is the president of the Mehdiabad Farmer Coperative Society lmt."
              />
              <PersonProfile
                imgSrc={ghImg}
                name="Ghulam Hussain"
                description="Ghulam Hussain  is the chairman of the Mehdiabad Farmer Coperative Cociety lmt."
              />
            </div>
          </Paper>
        </Container>
      </SidebarTab>
    </React.Fragment>
  );
};

export default Home;
