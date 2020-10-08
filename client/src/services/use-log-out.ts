import urls from "./urls";
import useGet from "./helpers/use-get";
import useFlushLoginAndRedirectToHome from "./use-flush-login-and-redirect-to-home";

const useLogout = () => {
  const {
    loading,
    errorMessage,
    doGet
  } = useGet(urls.logout);
  const flushLoginAndRedirectToHome = useFlushLoginAndRedirectToHome();

  const logout = () => {
    doGet(flushLoginAndRedirectToHome)
  };

  return {
    loading,
    errorMessage,
    logout
  }
};

export default useLogout
