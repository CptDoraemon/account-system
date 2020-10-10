import React from "react";
import useTextInput from "../../components/text-input/use-text-input";
import {Button, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import useSignUp from "../../services/use-sign-up";
import useStyles from "./styles";
import FacebookLogin from "./facebook-login";

interface SignUpProps {

}

const SignUp: React.FC<SignUpProps> = () => {
  const classes = useStyles();

  const {value: email, onChange: onEmailChange} = useTextInput();
  const {value: username, onChange: onUsernameChange} = useTextInput();
  const {value: password, onChange: onPasswordChange} = useTextInput();
  const {
    loading,
    errorMessage,
    submitForm
  } = useSignUp();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm({
      username,
      email,
      password
    })
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography variant={'h5'} component={'h2'} className={classes.title}>
        Sign Up
      </Typography>
      <TextField label="Email" value={email} onChange={onEmailChange} className={classes.textInput} variant={'outlined'}/>
      <TextField label="Username" value={username} onChange={onUsernameChange} className={classes.textInput} variant={'outlined'}/>
      <TextField label="Password" value={password} onChange={onPasswordChange} type={'password'} className={classes.textInput} variant={'outlined'}/>
      <Button className={classes.submit} type={'submit'} disabled={loading}>
        Submit
      </Button>
      <div className={classes.message}>
        &nbsp;
        {errorMessage && errorMessage}
      </div>
      <FacebookLogin/>
    </form>
  )
};

export default SignUp
