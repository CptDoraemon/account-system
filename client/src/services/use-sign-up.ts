import usePost from "./helpers/use-post";
import urls from "./urls";
import useFlushLoginAndRedirectToHome from "./use-flush-login-and-redirect-to-home";

const useSignUp = () => {
  const {
    loading,
    errorMessage,
    doPost
  } = usePost(urls.signUp);
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

export default useSignUp
