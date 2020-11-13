import React from 'react';
import { API_AUTHENTICATION_ENDPOINT_HTTP } from '../config';
import jwt_decode from 'jwt-decode';

const authAPISignUp = async (name, password, dispatch) => {
  return fetch(API_AUTHENTICATION_ENDPOINT_HTTP + '/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name: name, password: password }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
      const jsonRes = res.json();
      if (jsonRes.token) {
        dispatch({ type: 'SIGN_UP', token: jsonRes.token });
      } else {
        dispatch({ type: 'ERROR_SIGN_UP', token: jsonRes.errors })
      }
    },
    (err) => {
      console.log('authAPISignUp [err]: ', err);
    }
  );
};

const authAPISignIn = (name, password, dispatch) => {
  fetch(API_AUTHENTICATION_ENDPOINT_HTTP + '/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ name: name, password: password }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(
    async (res) => {
      const jsonRes = await res.json();
      dispatch({ type: 'SIGN_IN', token: jsonRes.token });
    },
    (err) => {
      console.log('authAPISignUp [err]: ', err);
    }
  );
};

const authAPISignOut = (dispatch) => {
  fetch(API_AUTHENTICATION_ENDPOINT_HTTP + '/auth/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(
    (res) => {
      dispatch({ type: 'SIGN_OUT', token: res.token });
    },
    (err) => {
      console.log('authAPISignOut [err]: ', err);
    }
  );
};

const AuthContext = React.createContext({
  isSignedIn: true,
  token: null,
  errors: null,
  signUp: () => {},
  signIn: () => {},
  signOut: () => {},
});

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_UP':
      localStorage.setItem('token', action.token)
      return {
        ...state,
        isSignedIn: true,
        token: action.token,
      };
    case 'SIGN_IN':
      localStorage.setItem('token', action.token)
      return {
        ...state,
        isSignedIn: true,
        token: action.token,
      };
    case 'SIGN_OUT':
      localStorage.setItem('token', null)
      return {
        ...state,
        isSignedIn: false,
        token: null,
      };
    case 'ERROR_SIGN_OUT':
      return {
        ...state,
        errors: action.errors
    }
    case 'ERROR_SIGN_IN':
      return {
        ...state,
        errors: action.errors
    }
    default:
      return state;
  }
};

const initialState = {
  isSignedIn: false,
  token: null,
  errors: null
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);
  const checkToken = () => {
    const token = localStorage.getItem('token');
    console.log('token :', token);
    let expirationTime = 0;
    if (token && token !== 'null') {
      try {
        expirationTime = jwt_decode(token).exp;
      }
      catch(err) {
        console.log('api-authentication [err token]: ', err);
      }
      const now = Date.now().valueOf() / 1000;
      if (expirationTime < now) {
        dispatch({ type: 'SIGN_OUT' });
      }
      if (localStorage.getItem('token') !== 'null' && state.isSignedIn === false) {
        dispatch({ type: 'SIGN_IN', token: localStorage.getItem('token') });
      }
    }

  }
  checkToken();
  const signIn = React.useCallback(({ name, password }) => {
    authAPISignIn(name, password, dispatch);
  });
  const signUp = React.useCallback(({ name, password }) => {
    authAPISignUp(name, password, dispatch);
  });
  const signOut = () => {
    authAPISignOut(dispatch);
  }
  return (
    <AuthContext.Provider
      value={{
        isSignedIn: state.isSignedIn,
        token: state.token,
        errors: state.errors,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};

export default useAuth;