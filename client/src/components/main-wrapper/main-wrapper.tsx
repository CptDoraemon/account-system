import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  wrapper: {
    width: theme.breakpoints.values['lg'] - 2 * theme.spacing(2),
    margin: theme.spacing(5, 2),
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      width: `calc(100% - ${2 * theme.spacing(1)}px)`,
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    }
  }
}));

const MainWrapper: React.FC = ({children}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.wrapper} elevation={0}>
        {children}
      </Paper>
    </div>
  )
};

export default MainWrapper
