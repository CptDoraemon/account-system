import React, {useContext, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import RouterScrollRestoration from "./router-scroll-restoration";
import LandingPageContainer from "./pages/landing-page";
import Header from "./components/header";
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from "./theme";
import AccountContext from "./services/account-context";
import MainWrapper from "./components/main-wrapper/main-wrapper";
import {useAccountContext} from "./services/account-context";
import Login from "./pages/login-signup/login";
import SignUp from "./pages/login-signup/sign-up";

export const routes = {
  home: '/',
  signUp: '/sign-up',
  login: '/login'
};

const App = () => {
  const accountContext = useAccountContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AccountContext.Provider value={accountContext}>
        <Router basename={process.env.PUBLIC_URL}>
          <RouterScrollRestoration />
          <Header />
          <MainWrapper>
            <Switch>
              <Route path={routes.home} exact render={ () => <LandingPageContainer/> } />
              <Route path={routes.signUp} exact render={ () => <SignUp/> } />
              <Route path={routes.login} exact render={ () => <Login/> } />
            </Switch>
          </MainWrapper>
        </Router>
      </AccountContext.Provider>
    </ThemeProvider>
  );
};

export default App
