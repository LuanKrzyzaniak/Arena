const User = require("../models/User");
const bcrypt = require("bcrypt");

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
            user: createdUser
        });

    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            errorDetail: error.detail,
            errorTable: error.table
        });
    }
}

async function login(req, res) {
    // User.getById()
}

// User profile will be retrieved using its id
async function list(req, res) {
    const { id } = req.params;

    try {
        const user = await User.getById(id);
        if (user == null)
            throw { detail: `User ${id} not found`, table: "client" }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({
            statusCode: 404,
            errorDetail: error.detail,
            errorTable: error.table
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
            description: "User updated"
        })
    } catch(error) {
        return res.status(400).json({
            statusCode: 400,
            errorDetail: error.detail,
            errorTable: error.table
        });
    }
}

async function remove(req, res) {

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

module.exports = { store, login, list, edit, remove };