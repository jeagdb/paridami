const express = require("express");
const router = express.Router();
const passport = require('../config/passport');
const { onAuthenticated } = require('../services/authentication');
const { check, validationResult } = require('express-validator');

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
  const token = passport.authenticate('json', onAuthenticated())(
    req,
    res,
    next
  );
  if (token) {
    res.send({ token }).status(200);
  } else
    res.send({ errors: "error signin !"}).status(401);
});
  
router.post("/signup", [
  check('password').isLength({ min: 5 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.array() }).status(401);
  }
  const token = passport.authenticate('json', onAuthenticated())(
    req,
    res,
    next
  );
  if (token) {
    res.send({ token }).status(200);
  } else
    res.send({ errors: "error signUp !"}).status(401);
})

module.exports = router;