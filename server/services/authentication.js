const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AES = require("crypto-js/aes");

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
  const pwd = AES.decrypt(inputPwd, process.env.SECRET_KEY).toString();
  console.log('pwd', pwd);
  return await bcrypt.compare(pwd, dbPwd)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error("checkCredentials: ", err)
      return false;
    })
}

const hashPassword = async (cypherPassword) => {
  const pwd = AES.decrypt(cypherPassword, process.env.SECRET_KEY).toString();
  return await bcrypt.hash(pwd, 10)
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