import React, {useContext} from "react";
import AccountContext from "../services/account-context";
import {CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

interface LandingPageProps {

}

const LandingPage: React.FC<LandingPageProps> = () => {
  const classes = useStyles();
  const accountState = useContext(AccountContext);

  if (accountState.loading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        {
          `Welcome, ${accountState.isLogin ? accountState.username : 'please login or sign up'}`
        }
      </div>
    )
  }
};

export default LandingPage
