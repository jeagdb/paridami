const { json } = require('express');
const pg = require('pg');
const UserModel = require('../models/userModel');
const Pool = pg.Pool

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

const getUserById = async (id) => {
  return await db.query('SELECT id, name, password FROM "user" WHERE id = $1', [id])
    .then(res => {
      if (res.rowCount === 0) {
        return null
      }
      return res.rows[0];
    })
    .catch(err => {
      console.error('findUserByUserName: ' + err)
      return null
    })
}

const findUserByUserName = async (userName) => {
  return await db.query('SELECT id, name, password FROM "user" WHERE name = $1', [userName])
    .then(res => {
      if (res.rowCount === 0) {
        return null
      }
      return res.rows[0];
    })
    .catch(err => {
      console.error('findUserByUserName: ' + err)
      return null
    })
}

const addUser = async (name, password) => {
  const userExist = await db.query('SELECT id FROM "user" WHERE name = $1', [name])
    .then(res => {
      return res.rows[0].id;
    })
    .catch(err => {
      return null;
    });
  if (userExist) {
    return null;
  }
  return await db.query('INSERT INTO "user" (name, password) VALUES ($1, $2) RETURNING id', 
    [name, password])
      .then(res => {
        return res.rows[0].id
      })
      .catch(err => {
        console.error('addUser :' + err)
        return null
      })
}

module.exports = {
  findUserByUserName,
  addUser
}