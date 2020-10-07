import React, {useEffect, useState} from "react";
import axios from "axios";
import urls from "./urls";

export interface IAccountContext {
  hasInit: boolean,
  isLogin: boolean,
  username: string
}

export const defaultAccountContext: IAccountContext = {
  hasInit: false,
  isLogin: false,
  username: ''
};

const AccountContext = React.createContext<IAccountContext>(defaultAccountContext);

export const useAccountContext = () => {
  const [state, setState] = useState(defaultAccountContext);

  const initAccountContext = async() => {
    try {
      const res = await axios.get(urls.verifyLogin, {withCredentials: true});
      const data = await res.data;

      // server responded
      if (res.status === 200) {
        setState(prevState => {
          return Object.assign({}, prevState, {
            hasInit: true,
            isLogin: true,
            username: data.username
          })
        })
      } else {
        setState(prevState => {
          return Object.assign({}, prevState, {
            hasInit: true,
            isLogin: false,
            username: ''
          })
        })
      }
    } catch (e) {
      setState(prevState => {
        return Object.assign({}, prevState, {
          hasInit: true,
          isLogin: false,
          username: ''
        })
      })
    }
  };

  useEffect(() => {
    initAccountContext()
  }, []);

  return state
};

export default AccountContext
