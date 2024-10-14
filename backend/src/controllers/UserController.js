const User = require("../models/User");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

async function store(req, res) {
  const { body } = req;

  body.password = await bcrypt.hash(body.password, 10);

  body.id = await generateId();

  let user = new User(
    body.id,
    body.username,
    null,
    body.password,
    body.email,
    null,
    null,
    body.birthdate
  );

  try {
    let createdUser = await user.save();

    return res.status(201).json({
      statusCode: 201,
      user: createdUser,
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      errorDetail: error.detail,
      errorTable: error.table,
    });
  }
}

async function check(req,res) {
    try {
      const token = req.cookies.tokenuser;
      if (token) {
        jwt.verify(token, "blablabla");
        res.status(200).json({ auth: true });
      } else {
        res.status(401).json({ auth: false });
      }
    } catch (error) {
      console.log(error)
      res.status(401).json({ auth: false });
    }
  }

async function login(req, res) {
  // User.getById()
  try {
    let user = new User(
      null,
      null,
      null,
      req.body.password,
      req.body.email,
      null,
      null,
      null
    );
    const valid = await user.verifyLogin(user.email, user.password);
    if (valid) {
      const token = jwt.sign({ user: User }, "blablabla", { expiresIn: 3600 });
      res.cookie("tokenuser", token, {
        maxAge: 900000,
        httpOnly: true,
        sameSite: "Lax",
      });
      
      res.status(200);
      res.json({ message: "logou e gerou cookie " });
    } else {
      res.status(500);
      res.json({ message: "invalido" });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "invalido" + error });
  }
}

// User profile will be retrieved using its id
async function list(req, res) {
  const { id } = req.params;

  try {
    const user = await User.getById(id);
    if (user == null) throw { detail: `User ${id} not found`, table: "client" };

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      errorDetail: error.detail,
      errorTable: error.table,
    });
  }
}

async function edit(req, res) {
  const { updateArrayInfo } = req.body;
  const { id } = req;

  let user = new User(
    //id,
    725962,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );

  try {
    await user.update(updateArrayInfo);

    return res.status(200).json({
      statusCode: 200,
      description: "User updated",
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      errorDetail: error.detail,
      errorTable: error.table,
    });
  }
}

async function remove(req, res) {
  try {
    let user = new User(req.body.id, null, null, null, null, null, null, null);
    const remove = await user.deleteById(user.id);
    if (remove) {
      res.status(200);
      res.json({ message: `user id: ${user.id} deleted` });
    } else {
      res.status(500);
      res.json({ message: `user id: ${user.id} not found` });
    }
  } catch (error) {}
}



// Just an aux function
async function generateId() {
  let exit = false;

  while (exit == false) {
    id = Math.floor(100000 + Math.random() * 900000);

    const userWithId = await User.getById(id);
    if (userWithId == null) {
      exit = true;
      return id;
    }
  }
}

module.exports = { store, login, list, edit, remove ,check};
