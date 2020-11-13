const passport = require('passport');
const { Strategy: JsonStrategy } = require('passport-json');

passport.use(
  new JsonStrategy(
    {
      usernameProp: 'name',
      passwordProp: 'password'
    },
    (username, password, done) => {
      //check si le user existe puis check le mdp avec airtable
      console.log("username: ", username);
      console.log("password: ", password);
      return done(null, user);
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