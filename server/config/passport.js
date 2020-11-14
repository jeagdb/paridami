const passport = require('passport');
const { Strategy: JsonStrategy } = require('passport-json');
const { findUserByUserName } = require('../db/airtable');

passport.use(
  new JsonStrategy(
    {
      usernameProp: 'name',
      passwordProp: 'password'
    },
    async (username, password, done) => {
      console.log(username, password);
      const user = await findUserByUserName(username);
      if (!user || user === undefined)
        return done('Unknown user');

      if (user.fields.Password !== password)
        return done('Invalid password');

      return done(null, user.fields);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(`Inside serializeUser callback. User id: ${user.id} is save to the session file store here`);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback');
  console.log(`The user id passport saved in the session file store is: ${id}`);
  //const user = GetUserWithId(id);
  user = null;
  done(null, user);
});

module.exports = passport;