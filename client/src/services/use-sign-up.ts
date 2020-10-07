import usePost from "./helpers/use-post";
import urls from "./urls";
import useRedirectToHome from "./helpers/use-redirect-home";

const useSignUp = () => {
  const {
    loading,
    errorMessage,
    doPost
  } = usePost(urls.signUp);
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

export default useSignUp
