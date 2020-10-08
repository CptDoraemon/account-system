import useRedirectToHome from "./helpers/use-redirect-home";
import {useContext} from "react";
import AccountContext from "./account-context";

const useFlushLoginAndRedirectToHome = () => {
  const toHome = useRedirectToHome();
  const {verifyLogin} = useContext(AccountContext);
  const flushLoginAndRedirectToHome = () => {
    verifyLogin();
    toHome()
  };

  return flushLoginAndRedirectToHome
};

export default useFlushLoginAndRedirectToHome
