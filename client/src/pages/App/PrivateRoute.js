import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../services/api-authentication';

const PrivateRoute = (props) => {
  const authenticationService = useAuth();
  if (authenticationService.token === 'null' || !authenticationService.isSignedIn) {
    return <Redirect to="/auth/sign" />;
  }
  return <Route {...props} />;
};

export default PrivateRoute;