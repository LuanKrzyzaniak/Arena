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
        const valid = await user.verifyLogin(user.email,user.password);
        if(valid){
            res.status(200);
            res.json({message:"logou"});
        } else{
            res.status(500);
            res.json({message:"invalido"});
        }

    } catch (error) {
        res.status(500);
        res.json({message:"invalido"});
    }

}

async function list(req, res) {

}

async function edit(req, res) {

}

async function remove(req, res) {
    try{
        let user = new User(
            req.body.id,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        );
        const remove = await user.deleteById(user.id);
        if(remove){
            res.status(200);
            res.json({message:`user id: ${user.id} deleted`});
        }
        else{
            res.status(500);
            res.json({message:`user id: ${user.id} not found`});
        }
        
    }catch(error){

    }
}

module.exports = { store, login, list, edit, remove };