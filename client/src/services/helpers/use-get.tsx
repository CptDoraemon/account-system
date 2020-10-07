import {useState} from "react";
import axios from 'axios';

const GENERIC_ERROR_MESSAGE = 'server error';

const useGet = <DataType,>(
  url: string,
) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState<DataType | null>(null);

  const doGet = async () => {
    try {
      if (loading) return;

      // reset states
      setErrorMessage('');

      // start fetching
      setLoading(true);
      const res = await axios.get(url, {withCredentials: true});
      const data = await res.data;

      // server responded
      setLoading(false);
      if (res.status >= 200 && res.status < 300) {
        setData(data)
      } else {
        setErrorMessage(GENERIC_ERROR_MESSAGE)
      }
    } catch (e) {
      setLoading(false);
      setErrorMessage(GENERIC_ERROR_MESSAGE)
    }
  };

  return {
    loading,
    errorMessage,
    data,
    doGet
  }

};

export default useGet
