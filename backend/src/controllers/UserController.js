const pool = require("../database")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function create(req, res) {
  const database = await pool.connect()
  const { body } = req

  // check email and username
  let response = await database.query("SELECT id FROM client WHERE email=$1 or username=$2", [body.email, body.username])
  database.release()
  if (response.rowCount !== 0) {
    return res.json({
      operation: "Failed",
      error: "Email or username already exists"
    })
  }

  database = await pool.connect();

  const hashedPassword = await bcrypt.hash(body.password, parseInt(process.env.PASSWORD_SALT))

  // generate user id
  let userId = 0
  let uniqueId = false
  while (uniqueId === false) {
    userId = parseInt(Math.random() * 1000000)
    response = await database.query("SELECT id FROM client WHERE id=$1", [userId])
    if (response.rowCount === 0)
      uniqueId = true
  }

  response = await database.query("INSERT INTO client (id, username, pass, email, birthdate, verified) VALUES ($1, $2, $3, $4, $5, $6)", [
    userId,
    body.username,
    hashedPassword,
    body.email,
    body.birthdate,
    false
  ])

  return res.json({
    operation: "Succeed"
  })
}

async function login(req, res) {
  const database = await pool.connect()

  const { mode, entry, password } = req.body

  const response = await database.query("SELECT id, pass, verified FROM client WHERE " + mode + "=$1", [entry])
  database.release()

  if(response.rowCount === 0)
    return res.json({
      operation: "Failed",
      error: mode + "not found"
    })

  const pass = response.rows[0].pass

  if(!await bcrypt.compare(password, pass))
  {
    return res.json({
      operation: "Failed",
      error: "Incorrect password"
    })
  }

  const token = jwt.sign({ id: response.rows[0].id, verified: response.rows[0].verified }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TTL
  })

  return res.json({
    operation: "Succeed",
    token
  })
}

async function verify(req, res) {

}

async function get(req, res) {

}

async function edit(req, res) {

}

async function remove(req, res) {

}

module.exports = { create, login, verify, get, edit, remove }