import {useState} from "react";
import axios from 'axios';

const GENERIC_ERROR_MESSAGE = 'server error';

const usePost = (
  url: string
) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const doPost = async (
    body: any,
    callbackOnSuccess?: () => void,
  ) => {
    try {
      if (loading) return;

      // reset states
      setErrorMessage('');

      // start fetching
      setLoading(true);
      const res = await axios.post(url, body, {withCredentials: true});
      const data = await res.data;

      // server responded
      setLoading(false);
      if (callbackOnSuccess) {
        callbackOnSuccess();
      }
    } catch (e) {
      setLoading(false);
      setErrorMessage(e.response?.data.message || GENERIC_ERROR_MESSAGE)
    }
  };

  return {
    loading,
    errorMessage,
    doPost
  }

};

export default usePost
