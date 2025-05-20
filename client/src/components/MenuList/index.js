import { List, ListItem, ListItemIcon } from "@material-ui/core/";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import Divider from "../../units/Divider";
import {
  SignInIcon,
  SignUpIcon,
  SignOutIcon,
  InventoryIcon,
  ChemicalIcon,
  LiveStockIcon,
  PredictionIcon,
} from "../../units/SvgIcons";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { useStyles } from "./styles";

import { connect } from "react-redux";
import { signOut } from "../../Redux/Actions/Auth";
import { useContext } from "react";

import { ThemeContext } from "../../App";

const AuthUserMenu = ({ toggleDrawer, signOut }) => {
  const classes = useStyles();

  const [isDarkTheme, toggleTheme] = useContext(ThemeContext);
  const handleToggleTheme = (e) => {
    toggleTheme();
    toggleDrawer(e);
  };
  return (
    <List>
      <Link to="/dashboard" className={classes.link}>
        <ListItem button onClick={toggleDrawer} className={classes.menuItem}>
          <ListItemIcon aria-label="dashboard" className={classes.menuItemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <p>Dashboard</p>
        </ListItem>
      </Link>

      <Link to="/profile" className={classes.link}>
        <ListItem button onClick={toggleDrawer} className={classes.menuItem}>
          <ListItemIcon
            className={classes.menuItemIcon}
            aria-label="account of current user"
            color="inherit"
          >
            <AccountCircle />
          </ListItemIcon>
          <p>Profile</p>
        </ListItem>
      </Link>
      <Divider />
      <Link to="/inventory" className={classes.link}>
        <ListItem button onClick={toggleDrawer} className={classes.menuItem}>
          <ListItemIcon
            aria-label="Inventory management"
            className={classes.menuItemIcon}
          >
            <InventoryIcon />
          </ListItemIcon>
          <p>Inventory Management</p>
        </ListItem>
      </Link>

      <Link to="/livestock" className={classes.link}>
        <ListItem button onClick={toggleDrawer} className={classes.menuItem}>
          <ListItemIcon
            aria-label="livestock management"
            className={classes.menuItemIcon}
          >
            <LiveStockIcon />
          </ListItemIcon>
          <p>Livestock Management</p>
        </ListItem>
      </Link>

      <Link to="/farmChemicals" className={classes.link}>
        <ListItem button onClick={toggleDrawer} className={classes.menuItem}>
          <ListItemIcon
            aria-label="farm chemiclas management"
            className={classes.menuItemIcon}
          >
            <ChemicalIcon />
          </ListItemIcon>
          <p>Manage Farm Chemicals</p>
        </ListItem>
      </Link>

      <Divider />

      <Link to="/predictions" className={classes.link}>
        <ListItem button onClick={toggleDrawer} className={classes.menuItem}>
          <ListItemIcon
            aria-label="Prediction System"
            className={classes.menuItemIcon}
          >
            <PredictionIcon />
          </ListItemIcon>
          <p>Prediction System</p>
        </ListItem>
      </Link>

      <ListItem button onClick={handleToggleTheme} className={classes.menuItem}>
        <ListItemIcon
          aria-label="sign out"
          color="inherit"
          className={classes.menuItemIcon}
        >
          {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
        </ListItemIcon>
        {isDarkTheme ? <p>Light Theme</p> : <p>Dark Theme</p>}
      </ListItem>
      <Divider />

      <Link to="/" className={classes.link}>
        <ListItem button onClick={signOut} className={classes.menuItem}>
          <ListItemIcon
            aria-label="sign out"
            color="inherit"
            className={classes.menuItemIcon}
          >
            <SignOutIcon />
          </ListItemIcon>
          <p>Sign Out</p>
        </ListItem>
      </Link>
    </List>
  );
};

const mapStateToProps = (state) => {
  const { Auth } = state;
  return {
    Auth,
  };
};

const mapDispatchToProps = { signOut };

export const AuthUserMenuConnectWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthUserMenu);

export const VisitorMenuList = ({
  toggleDrawer,
  handleAuth,
  handleSignInOpen,
}) => {
  const classes = useStyles();

  const [isDarkTheme, toggleTheme] = useContext(ThemeContext);

  const handleToggleTheme = (e) => {
    toggleTheme();
    toggleDrawer(e);
  };

  return (
    <List>
      <ListItem
        button
        onClick={(e) => {
          handleSignInOpen();
          toggleDrawer(e);
        }}
        className={classes.menuItem}
      >
        <ListItemIcon aria-label="sign in" className={classes.menuItemIcon}>
          <SignInIcon />
        </ListItemIcon>
        <p>Sign In</p>
      </ListItem>

      <Link to="/signup" className={classes.link}>
        <ListItem button onClick={toggleDrawer} className={classes.menuItem}>
          <ListItemIcon aria-label="sign up" className={classes.menuItemIcon}>
            <SignUpIcon />
          </ListItemIcon>
          <p>Sign Up</p>
        </ListItem>
      </Link>

      <Divider />
      <Link to="/predictions" className={classes.link}>
        <ListItem button onClick={toggleDrawer} className={classes.menuItem}>
          <ListItemIcon
            aria-label="prediction system"
            className={classes.menuItemIcon}
          >
            <PredictionIcon />
          </ListItemIcon>
          <p>Prediction System</p>
        </ListItem>
      </Link>
      <ListItem button onClick={handleToggleTheme} className={classes.menuItem}>
        <ListItemIcon
          aria-label="sign out"
          color="inherit"
          className={classes.menuItemIcon}
        >
          {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
        </ListItemIcon>
        {isDarkTheme ? <p>Light Theme</p> : <p>Dark Theme</p>}
      </ListItem>
    </List>
  );
};
