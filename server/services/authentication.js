const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function handleResponse(res, code, statusMsg) {
  res.status(code).json(statusMsg);
}

const onAuthenticated = (req, res, next) => (err, user) => {
  if (err) {
    return handleResponse(res, 401, { errors: [err] });
  }
  if (user) {
    const tokenContents = {
      sub: user.id,
      name: user.name,
      iat: Date.now() / 1000,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
    };
    handleResponse(res, 200, {
      token: jwt.sign(tokenContents, process.env.ENCRYPTION_KEY)
    });
  }
};

const checkCredentials =  async (inputPwd, dbPwd) => {
  return await bcrypt.compare(inputPwd, dbPwd)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error("checkCredentials: ", err)
      return false;
    })
}

const hashPassword = async (cypherPassword) => {
  return await bcrypt.hash(cypherPassword, 10)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error("hashPassword : [err] : ", err);
      return null;
    })
}

module.exports = { 
  onAuthenticated,
  hashPassword,
  checkCredentials
};