const urls: {[keys: string]: string} = {
  verifyLogin: '/api/verify-login',
  signUp: '/api/register',
  login: '/api/login',
};

if (process.env.REACT_APP_DEBUG === 'true') {
  Object.entries(urls).forEach(([key, value]) => {
    urls[key] = `http://localhost:5000${value}`
  })
}

export default urls
