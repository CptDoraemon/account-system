const urls = {
  verifyLogin: '/api/verify-login',
  signUp: '/api/register',
  login: '/api/login',
  logout: '/api/logout',
  loginFacebook: '/api/login-facebook'
};

if (process.env.REACT_APP_DEBUG === 'true') {
  Object.entries(urls).forEach(([key, value]) => {
    // @ts-ignore
    urls[key] = `http://localhost:5000${value}`
  })
}

export default urls
