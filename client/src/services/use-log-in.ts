import usePost from "./helpers/use-post";
import urls from "./urls";
import useRedirectToHome from "./helpers/use-redirect-home";

const useLogin = () => {
  const {
    loading,
    errorMessage,
    doPost
  } = usePost(urls.login);
  const toHome = useRedirectToHome();

  const submitForm = (
    body: any,
  ) => {
    doPost(body, toHome)
  };

  return {
    loading,
    errorMessage,
    submitForm
  }
};

export default useLogin
