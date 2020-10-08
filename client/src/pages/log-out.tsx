import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import useLogout from "../services/use-log-out";

const useStyles = makeStyles(theme => ({
  root: {

  }
}));

interface LogOutProps {

}

const LogOut: React.FC<LogOutProps> = () => {
  const classes = useStyles();
  const {
    loading,
    errorMessage,
    logout
  }= useLogout();

  useEffect(() => {
    logout()
  }, []);

  return (
    <div>
      {errorMessage || 'logging out'}
    </div>
  )
};

export default LogOut
