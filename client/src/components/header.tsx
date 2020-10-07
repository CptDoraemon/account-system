import React from "react";
import {routes} from "../App";
import {Link} from "react-router-dom";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import {useAccountContext} from "../services/account-context";

const useStyles = makeStyles(theme => ({
  title: {
    flex: 1
  },
  buttonLogIn: {
    color: theme.palette.secondary.contrastText,
    '& :hover': {

    }
  },
  buttonSignUp: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  button: {
    margin: theme.spacing(0, 1),
    minWidth: 100
  }
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const accountContext = useAccountContext();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <IconButton edge="start"  color="inherit" aria-label="menu">
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Account System Demo
        </Typography>
        {
          accountContext.isLogin ?
            <Button className={clsx(classes.buttonSignUp, classes.button)}>Logout</Button> :
            <>
              <Button className={clsx(classes.buttonLogIn, classes.button)} component={Link} to={routes.login}>Log in</Button>
              <Button className={clsx(classes.buttonSignUp, classes.button)} component={Link} to={routes.signUp}>Sign up</Button>
            </>
        }
      </Toolbar>
    </AppBar>
  )
};

export default Header
