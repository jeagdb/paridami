const express = require('express');

const passport = require('../config/passport');
const { User } = require('../db/schema');
const { errorHandler } = require('../db/errors');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

function handleResponse(res, code, statusMsg) {
  res.status(code).json(statusMsg);
}

authRouter.post(
  '/login',
  [
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 5 })
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return handleResponse(res, 200, { errors: errors.array() });
    }

    console.log('init passport authentication');
    passport.authenticate('json', onAuthenticated(req, res, next))(
      req,
      res,
      next
    );
  }
);

authRouter.get('/logout', (req, res, next) => {
  req.logout();
  handleResponse(res, 200);
});

// Signup using username and password.
authRouter.post(
  '/signup',
  [
    check('email')
      .normalizeEmail()
      .isEmail()
      .notEmpty(),
    check('password').isLength({ min: 5 })
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return handleResponse(res, 200, { errors: errors.array() });
    }

    try {
      await User.query()
        .allowInsert('[id, name, password]')
        .insert({
          id: req.body.email,
          name: req.body.email.split('@')[0],
          password: req.body.password
        });
    } catch (err) {
      errorHandler(err, res);
      return;
    }

    passport.authenticate('json', onAuthenticated(req, res, next))(
      req,
      res,
      next
    );
  }
);