const passport = require('passport');
const { Strategy: JsonStrategy } = require('passport-json');
const { findUserByUserName, getUserById } = require('../db/userQueries');
const { checkCredentials } = require('../services/authentication');

passport.use(
  new JsonStrategy(
    {
      usernameProp: 'name',
      passwordProp: 'password'
    },
    async (username, password, done) => {
      const user = await findUserByUserName(username);
      if (!user || user === undefined)
        return done('Unknown user');

      console.log('jere');
      const isValidCredentials = await checkCredentials(password, user.password);
      if (!isValidCredentials)
        return done('Invalid password');

      console.log("lets go the next etape")
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(`Inside serializeUser callback. User id: ${user.id} is save to the session file store here`);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log('Inside deserializeUser callback');
  console.log(`The user id passport saved in the session file store is: ${id}`);
  const user = await GetUserById(id);
  done(null, user);
});

module.exports = passport;