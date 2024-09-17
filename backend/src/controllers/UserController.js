const User = require("../models/User")

async function store(req, res) {
    const { body } = req;

    // check if user isn't in db
    const checkedUser = await User.getByEmail(body.email);
    if(checkedUser.rowCount > 0)
    {
        return res.status(409).json({
            statusCode: 409,
            description: "User already exists"
        });
    }

    // encrypt password
    body.password = await bcrypt.hash(body.password, 10);

    // generate unique id
    body.id = await generateId();

    // create user
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
    let creationResponse = await user.save();

    return res.status(creationResponse.statusCode).json(creationResponse);
}

async function login(req, res) {
    // User.getById()
}

// User profile will be retrieved using its id
async function list(req, res) {
    const { id } = req.id;

    const user = await User.getById(id);

    return res.status(user.statusCode).json(user);
}

async function edit(req, res) {

}

async function remove(req, res) {

}

module.exports = { store, login, list, edit, remove };