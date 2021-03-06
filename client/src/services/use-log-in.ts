import usePost from "./helpers/use-post";
import urls from "./urls";
import useFlushLoginAndRedirectToHome from "./use-flush-login-and-redirect-to-home";

const useLogin = () => {
  const {
    loading,
    errorMessage,
    doPost
  } = usePost(urls.login);
  const flushLoginAndRedirectToHome = useFlushLoginAndRedirectToHome();

  const submitForm = (
    body: any,
  ) => {
    doPost(body, flushLoginAndRedirectToHome)
  };

  return {
    loading,
    errorMessage,
    submitForm
  }
};

export default useLogin
