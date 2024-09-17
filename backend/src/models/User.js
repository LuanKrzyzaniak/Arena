const db = require("../database");
const bcrypt = require("bcrypt");

class User {
    constructor(
        id,
        username,
        displayname,
        password,
        email,
        description,
        sports,
        birthdate
    ) {
        this.id = id;
        this.username = username;
        this.displayname = displayname;
        this.password = password;
        this.email = email;
        this.description = description;
        this.sports = sports;
        this.birthdate = birthdate;
    }

    // Send new user to database
    // TODO: Maybe its better to put query in a try/catch and treat errors
    async save() {
        // connect db
        const dbClient = db.connect();

        // send to db (query)
        const createdUser = await dbClient.query(
            'INSERT INTO client (id, username, pass, email, birthdate) VALUES ($1, $2, $3, $4, $5)',
            [this.id, this.username, this.password, this.email, this.birthdate]
        );

        // drop db connection
        dbClient.release();

        // create response
        let response = {
            statusCode: 201,
            createdUser
        }

        // return response
        return response;
    }

    // Search for user using id
    static async getById(id) {
        const dbClient = await db.connect();
        const res = await db.query("SELECT id, username, email, pass FROM client WHERE id=$1", [id]);
        dbClient.release();

        return { rows: res.rows, rowCount: res.rowCount };
    }

    static async getByEmail(email) {
        const dbClient = await db.connect();
        const res = await db.query("SELECT id, username, email, pass FROM client WHERE email=$1", [email]);
        dbClient.release();

        return { rows: res.rows, rowCount: res.rowCount };
    }
}

async function generateId() {
    let exit = false;

    while (exit == false) {
        id = Math.floor(100000 + Math.random() * 900000);

        const userWithId = await User.getById(id);
        if (userWithId.rowCount == 0) {
            exit = true;
            return id;
        }
    }
}

module.exports = User;