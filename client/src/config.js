export const API_AUTHENTICATION_ENDPOINT_HTTP = process.env
  .API_AUTHENTICATION_ENDPOINT_HTTP
  ? process.env.API_AUTHENTICATION_ENDPOINT_HTTP
  : 'http://localhost:4001';

export const SECRET_KEY = 'je suis un secret'