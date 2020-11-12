import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from '../../components/Commons/Header';
import { AuthContextProvider } from '../../services/api-authentication';

import '../../css/App.css';

const NoRouteMatchPage = lazy(() => import('./NoRouteMatchPage'));
const PrivateRoute = lazy(() => import('./PrivateRoute'));

const HomePage = lazy(() => import('../pages/HomePage'));

const DealList = lazy(() => import('../pages/Deal/DealList'));

const Sign = lazy(() => import('../pages/Sign/Sign'));
const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Suspense fallback={<div>loading...</div>}>
          <Switch>
          <AuthContextProvider>
            <Header/>
            <Route path="/auth/sign">
              <Sign/>
            </Route>
            <Route>
              <PrivateRoute path="/">
                <HomePage />
              </PrivateRoute>
              <NoRouteMatchPage />
            </Route>
            <Route>
              <PrivateRoute path="/deals">
                <DealList />
              </PrivateRoute>
              <NoRouteMatchPage />
            </Route>
            </AuthContextProvider>
          </Switch>
      </Suspense>
    </Router>
  );
}

export default App;