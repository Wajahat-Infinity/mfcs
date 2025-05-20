import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core/";
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";
import { Link } from "react-router-dom";
import SignInModal from "../SignIn/SignInModal";
import Drawer from "../../units/Drawer";
import { AuthUserMenuConnectWrapper, VisitorMenuList } from "../MenuList";
import { useStyles } from "./styles";

const Header = (props) => {
  const { auth } = props;
  const classes = useStyles();

  const [isDrawerOpen, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen((pre) => !pre);
  };

  const handleAuth = (e) => {
    // setAuth(!auth);
    if (isDrawerOpen) toggleDrawer(e);
  };
  const handelNavItemClick = (e) => {
    if (isDrawerOpen) toggleDrawer(e);
  };

  // =================== For Log In  ===========================//

  const [openSignIn, setOpenSignIn] = useState(false);
  const handleSignInOpen = () => {
    setOpenSignIn(true);
  };
  const handleSignInClose = () => {
    setOpenSignIn(false);
  };

  const sideMenuRef = useRef(null);
  useEffect(() => {
    const bodyClick = (e) => {
      if (
        (sideMenuRef.current && sideMenuRef.current.contains(e.target)) ||
        e.target.classList.contains("toggleDrawerButton") ||
        (e.target?.parentElement?.classList &&
          e.target?.parentElement?.classList.contains("toggleDrawerButton"))
      )
        return;
      setOpen(false);
    };

    document.body.addEventListener("click", bodyClick);
    return () => {
      document.body.removeEventListener("click", bodyClick);
    };
  }, []);

  const [hideDesktopView, setHideDesktopView] = useState(
    window.innerWidth < 960
  );
  useEffect(() => {
    const f = (e) => {
      setHideDesktopView(e.target.innerWidth < 960);
    };
    window.addEventListener("resize", f);
    return () => {
      window.removeEventListener("resize", f);
    };
  }, []);

  return (
    <div className={classes.root}>
      <AppBar className="header" position="fixed">
        <Toolbar className={classes.fixIconPosition}>
          <div className={classes.sectionDesktop}>
            <IconButton
              className={`${classes.menuButton} toggleDrawerButton`}
              aria-label="show more"
              onClick={toggleDrawer}
              color="inherit"
            >
              {isDrawerOpen ? (
                <ClearIcon />
              ) : (
                <MenuIcon className="toggleDrawerButton" />
              )}
            </IconButton>
          </div>

          <div>
            <Link to="/" className={`${classes.grow} ${classes.navLink}`}>
              <Typography variant="h6" className={classes.appTitle}>
                <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="MFCS Logo" className="logo" style={{ height: 48, marginRight: 8, verticalAlign: 'middle' }} />
                <span className="title">MFCS</span>
              </Typography>
            </Link>
          </div>

          <div className={classes.grow} />
          {auth ? (
            <div className={classes.sectionMobile}>
              <IconButton
                className={`${classes.menuButton} toggleDrawerButton`}
                aria-label="show more"
                onClick={toggleDrawer}
                color="inherit"
              >
                {isDrawerOpen ? (
                  <ClearIcon />
                ) : (
                  <MenuIcon className="toggleDrawerButton" />
                )}
              </IconButton>
            </div>
          ) : (
            <>
              {/* 
                Desktop Menu for Non Auth Member
                i.e. Visitor 
                */}
              {!hideDesktopView ? (
                <div className={classes.navMenu}>
                  <Link
                    to="/predictions"
                    className={`${classes.navLink} menu-item`}
                  >
                    <Typography variant="body1">Prediction System</Typography>
                  </Link>

                  <div className="menu-item" onClick={handleSignInOpen}>
                    <Typography variant="body1">Sign In</Typography>
                  </div>

                  <Link to="/signup" className={`${classes.navLink} menu-item`}>
                    <Typography variant="body1">Sign Up</Typography>
                  </Link>
                </div>
              ) : (
                <div>
                  <IconButton
                    className={`${classes.menuButton} toggleDrawerButton`}
                    aria-label="show more"
                    onClick={toggleDrawer}
                    color="inherit"
                  >
                    {isDrawerOpen ? (
                      <ClearIcon />
                    ) : (
                      <MenuIcon className="toggleDrawerButton" />
                    )}
                  </IconButton>
                </div>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      <div ref={sideMenuRef}>
        {!hideDesktopView ? (
          <div>
            <Drawer
              variant="permanent"
              anchor="left"
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: isDrawerOpen,
                [classes.drawerClose]: !isDrawerOpen,
              })}
              classes={{
                paper: clsx(classes.drawer, {
                  [classes.drawerOpen]: isDrawerOpen,
                  [classes.drawerClose]: !isDrawerOpen,
                }),
              }}
            >
              <div className={classes.toolbar} />
              {auth ? (
                <AuthUserMenuConnectWrapper
                  toggleDrawer={handelNavItemClick}
                  handleAuth={handleAuth}
                />
              ) : (
                <VisitorMenuList
                  toggleDrawer={handelNavItemClick}
                  handleAuth={handleAuth}
                  handleSignInOpen={handleSignInOpen}
                />
              )}
            </Drawer>
          </div>
        ) : (
          <div>
            <Drawer variant="permanent" open={isDrawerOpen} anchor="right">
              <div className={classes.toolbar} />
              {auth ? (
                <AuthUserMenuConnectWrapper
                  toggleDrawer={handelNavItemClick}
                  handleAuth={handleAuth}
                />
              ) : (
                <VisitorMenuList
                  toggleDrawer={handelNavItemClick}
                  handleAuth={handleAuth}
                  handleSignInOpen={handleSignInOpen}
                />
              )}
            </Drawer>
          </div>
        )}
      </div>

      <SignInModal
        openSignIn={openSignIn}
        handleSignInClose={handleSignInClose}
      />
    </div>
  );
};

export default Header;
