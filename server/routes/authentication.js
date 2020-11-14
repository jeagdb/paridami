const express = require("express");
const router = express.Router();
const passport = require('../config/passport');
const { onAuthenticated } = require('../services/authentication');
const { check, validationResult } = require('express-validator');
const { addUser } = require('../db/airtable');

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
  const isAdd = await addUser(req.body.name, req.body.password);
  if (!isAdd) {
    return res.send({ errors: 'authentication route : signUp [err]: addUser error' }).status(401);
  }
  passport.authenticate('json', onAuthenticated())(
    req,
    res,
    next
  );
})

module.exports = router;