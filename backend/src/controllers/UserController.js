const User = require("../models/User")

async function store(req, res) {
    const { body } = req;

    let user = new User(
        null,
        body.username,
        null,
        body.password,
        body.email,
        null,
        null,
        body.birthdate
    );

    let creationResponse = await user.save();

    return res.status(creationResponse.statusCode).json(creationResponse);
}

async function login(req, res) {
    // User.getById()
}

async function list(req, res) {

}

async function edit(req, res) {

}

async function remove(req, res) {

}

module.exports = { store, login, list, edit, remove };