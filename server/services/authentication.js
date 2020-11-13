const jwt = require('jsonwebtoken');

const onAuthenticated = () => (err, user) => {
  if (err) {
    return null;
  }
  
  if (user) {
    const tokenContents = {
      sub: user.id,
      name: user.name,
      iat: Date.now() / 1000,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
    };

    return jwt.sign(tokenContents, process.env.ENCRYPTION_KEY);
  }
};
module.exports = { onAuthenticated };