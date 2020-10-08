import React, {useContext} from "react";
import {routes} from "../App";
import {Link} from "react-router-dom";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import AccountContext from "../services/account-context";
import { lighten } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
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
    justifyContent: 'flex-end'
  },
  buttonLogIn: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)'
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

  return (
    <AppBar position="static" elevation={0}>
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
            accountState.isLogin ?
              <Button className={clsx(classes.buttonSignUp, classes.button)} component={Link} to={routes.logOut}>Logout</Button> :
              <>
                <Button className={clsx(classes.buttonLogIn, classes.button)} component={Link} to={routes.login}>Log in</Button>
                <Button className={clsx(classes.buttonSignUp, classes.button)} component={Link} to={routes.signUp}>Sign up</Button>
              </>
          }
        </div>
      </Toolbar>
    </AppBar>
  )
};

export default Header
