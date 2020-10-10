import React from "react";
import urls from "../../services/urls";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider} from "@material-ui/core";
import { lighten } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(1, 0),
    minWidth: 250,
  },
  facebookButton: {
    backgroundColor: 'rgb(59, 120, 234)',
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    minWidth: 250,
    textAlign: 'center',
    fontWeight: 800,
    '&:hover': {
      backgroundColor: lighten('rgb(59, 120, 234)', 0.2)
    }
  }
}));

const FacebookLogin = () => {

  const classes = useStyles();

  return (
    <>
      <Divider className={classes.divider}/>
      <Button component={'a'} href={urls.loginFacebook} className={classes.facebookButton}>
        login with facebook
      </Button>
    </>
  )
};

export default FacebookLogin
