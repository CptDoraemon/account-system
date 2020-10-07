import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textInput: {
    margin: theme.spacing(1, 0),
    minWidth: 250,
    maxWidth: '100%'
  },
  title: {
    margin: theme.spacing(1, 0),
    fontWeight: 700
  },
  submit: {
    margin: theme.spacing(1, 0),
    minWidth: 250,
    maxWidth: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    }
  },
  message: {
    minHeight: '1rem'
  }
}));

export default useStyles
