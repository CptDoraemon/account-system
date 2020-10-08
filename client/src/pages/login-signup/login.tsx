import React from "react";
import useTextInput from "../../components/text-input/use-text-input";
import {Button, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import useLogin from "../../services/use-log-in";
import FacebookLogin from "./facebook-login";

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {
  const classes = useStyles();

  const {value: email, onChange: onEmailChange} = useTextInput();
  const {value: password, onChange: onPasswordChange} = useTextInput();
  const {
    loading,
    errorMessage,
    submitForm
  } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm({
      email,
      password
    })
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography variant={'h5'} component={'h2'} className={classes.title}>
        Log in
      </Typography>
      <TextField label="Email" value={email} onChange={onEmailChange} className={classes.textInput} variant={'outlined'}/>
      <TextField label="Password" value={password} onChange={onPasswordChange} type={'password'} className={classes.textInput} variant={'outlined'}/>
      <Button className={classes.submit} type={'submit'} disabled={loading}>
        Submit
      </Button>
      <div className={classes.message}>
        {errorMessage && errorMessage}
      </div>
      <FacebookLogin></FacebookLogin>
    </form>
  )
};

export default Login
