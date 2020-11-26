const express = require("express");
const router = express.Router();
const passport = require('../config/passport');
const { onAuthenticated, hashPassword, checkCredentials } = require('../services/authentication');
const { check, validationResult } = require('express-validator');
const { addUser } = require('../db/userQueries');

router.get("/signout", (req, res) => {
  req.logOut();
  res.send({ response: "logout" }).status(200);
});
  
router.post("/signin", [
  check('password').isLength({ min: 5 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.array() }).status(401);
  }
  const isValidCredentials = checkCredentials(req.body.name, req.body.password);
  if (!isValidCredentials) {
    return res.send({ errors: 'Wrong credentials...'})
  }
  passport.authenticate('json', onAuthenticated(req, res, next))(
    req,
    res,
    next
  );
});
  
router.post("/signup", [
  check('password').isLength({ min: 5 })
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.array() }).status(401);
  }
  const hashPwd = await hashPassword(req.body.password);
  const isAdd = await addUser(req.body.name, hashPwd);
  if (!isAdd) {
    return res.send({ errors: 'authentication route : signUp [err]: addUser error' }).status(401);
  }
  passport.authenticate('json', onAuthenticated(req, res, next))(
    req,
    res,
    next
  );
})

module.exports = router;