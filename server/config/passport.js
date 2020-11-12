const passport = require('passport');
const { Strategy: JsonStrategy } = require('passport-json');
const { User } = require('../db/schema');

passport.use(
  new JsonStrategy(
    {
      usernameProp: 'name',
      passwordProp: 'password'
    },
    (username, password, done) => {
      //check si le user existe puis check le mdp
      return done(null, user);
    }
  )
);

module.exports = passport;