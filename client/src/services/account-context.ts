import React, {useEffect, useState} from "react";
import urls from "./urls";
import useGet from "./helpers/use-get";

export interface IAccountContext {
  loading: boolean,
  isLogin: boolean,
  username: string,
  verifyLogin: () => void
}

export const defaultAccountContext: IAccountContext = {
  loading: false,
  isLogin: false,
  username: '',
  verifyLogin: () => false
};

const AccountContext = React.createContext<IAccountContext>(defaultAccountContext);

export const useAccountContext = () => {
  const {
    loading,
    errorMessage,
    data,
    doGet
  } = useGet(urls.verifyLogin);

  const isLogin = !errorMessage && data;
  const username = data ? data.username : '';

  useEffect(() => {
    doGet()
  }, []);

  return {
    loading,
    isLogin,
    username,
    verifyLogin: doGet
  }
};

// export const useAccountContext = () => {
//   const [state, setState] = useState(defaultAccountContext);
//
//   const initAccountContext = async() => {
//     try {
//       const res = await axios.get(urls.verifyLogin, {withCredentials: true});
//       const data = await res.data;
//
//       // server responded
//       if (res.status === 200) {
//         setState(prevState => {
//           return Object.assign({}, prevState, {
//             hasInit: true,
//             isLogin: true,
//             username: data.username
//           })
//         })
//       } else {
//         setState(prevState => {
//           return Object.assign({}, prevState, {
//             hasInit: true,
//             isLogin: false,
//             username: ''
//           })
//         })
//       }
//     } catch (e) {
//       setState(prevState => {
//         return Object.assign({}, prevState, {
//           hasInit: true,
//           isLogin: false,
//           username: ''
//         })
//       })
//     }
//   };
//
//   useEffect(() => {
//     initAccountContext()
//   }, []);
//
//   return state
// };

export default AccountContext
