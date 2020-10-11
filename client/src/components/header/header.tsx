import React, {useContext, useState} from "react";
import {routes} from "../../App";
import {Link} from "react-router-dom";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import AccountContext from "../../services/account-context";
import { lighten } from '@material-ui/core/styles/colorManipulator';
import HeaderMobileMenu from "./header-mobile-menu";
import MenuIcon from '@material-ui/icons/Menu';

const useMobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(state => !state)
  };

  return {
    isMobileMenuOpen,
    toggleMobileMenu
  }
};

export interface MenuItem {
  text: string,
  to: string,
  isPrimary: boolean
}

const getMenuItems = (isLogin: boolean): MenuItem[] => {
  if (isLogin) {
    return [{
      text: 'Logout',
      to: routes.logOut,
      isPrimary: true
    }]
  } else {
    return [
      {
        text: 'Log In',
        to: routes.login,
        isPrimary: false
      },
      {
        text: 'Sign Up',
        to: routes.signUp,
        isPrimary: true
      }
    ]
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'hidden'
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  buttonGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  mobileMenuButton: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      color: theme.palette.primary.contrastText,
    }
  },
  buttonLogIn: {
    boxShadow: `inset 0 0 0 2px rgba(255,255,255,0.2)`,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      boxShadow: `none`,
    }
  },
  buttonSignUp: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: lighten(theme.palette.secondary.main, 0.4),
    }
  },
  button: {
    margin: theme.spacing(0, 1),
    minWidth: 100
  }
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const accountState = useContext(AccountContext);
  const {
    isMobileMenuOpen,
    toggleMobileMenu
  } = useMobileMenu();
  const menuItems = getMenuItems(accountState.isLogin);

  return (
    <AppBar position="static" elevation={0} className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" color="inherit" aria-label="home" component={Link} to={routes.home}>
          <HomeIcon />
          <Typography variant="h6">
            <Box mx={1}>
              Account System Demo
            </Box>
          </Typography>
        </IconButton>
        <div className={classes.buttonGroup}>
          {
            menuItems.map(menuItem => (
              <Button
                className={clsx(menuItem.isPrimary ? classes.buttonSignUp : classes.buttonLogIn, classes.button)}
                component={Link} to={menuItem.to} key={menuItem.text}>{menuItem.text}</Button>
            ))
          }
        </div>
        <div className={classes.mobileMenuButton}>
          <IconButton aria-label="toggle menu" onClick={toggleMobileMenu} color='inherit'>
            <MenuIcon/>
          </IconButton>
        </div>

        <HeaderMobileMenu isOpen={isMobileMenuOpen} toggleDrawer={toggleMobileMenu} menuItems={menuItems}/>
      </Toolbar>
    </AppBar>
  )
};

export default Header
