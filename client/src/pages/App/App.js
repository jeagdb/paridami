import React, { Suspense, lazy } from "react";
import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from '../../components/Commons/Header';
import { AuthContextProvider } from '../../services/api-authentication';
import Poppin from '../../fonts/font';

import '../../css/App.css';

const NoRouteMatchPage = lazy(() => import('./NoRouteMatchPage'));
const PrivateRoute = lazy(() => import('./PrivateRoute'));

const HomePage = lazy(() => import('../HomePage'));

const DealList = lazy(() => import('../Deal/DealList'));

const Sign = lazy(() => import('../Sign/Sign'));
const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Suspense fallback={<div>loading...</div>}>
        <AuthContextProvider>
          <Poppin/>
          <Header/>
          <Switch>
              <Route path="/auth/sign" component={Sign}/>
              <PrivateRoute exact path="/" component={HomePage}/>
              <PrivateRoute path="/deals" component={DealList}/>
              <Route component={NoRouteMatchPage}/>
          </Switch>
        </AuthContextProvider>
      </Suspense>
    </Router>
  );
}

export default App;