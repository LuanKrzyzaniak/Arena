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
        // encrypt password
        this.password = await bcrypt.hash(this.password, 10);

        // connect to db
        const dbClient = await db.connect();

        // generate unique id
        this.id = await generateId();

        // check if user isn't in db
        const checkedUser = await User.getByEmail(this.email);

        if(checkedUser.rowCount > 0)
        {
            let response = {
                statusCode: 409,
                description: "User already exists"
            }

            return response;
        }

        // send to db (query)
        const createUser = await dbClient.query(
            'INSERT INTO client (id, username, pass, email, birthdate) VALUES ($1, $2, $3, $4, $5)',
            [this.id, this.username, this.password, this.email, this.birthdate]
        );

        // drop db connection
        dbClient.release();

        // create response
        let response = {
            statusCode: 201,
            user: {
                id: this.id,
                username: this.username,
                email: this.email,
                birthdate: this.birthdate
            }
        }

        // return response
        return response;
    }

    // Search for user using id
    static async getById(id) {
        const dbClient = await db.connect();
        const res = await db.query("SELECT id, username, email FROM client WHERE id=$1", [id]);
        dbClient.release();

        return { rows: res.rows, rowCount: res.rowCount };
    }

    static async getByEmail(email) {
        const dbClient = await db.connect();
        const res = await db.query("SELECT id, username, email FROM client WHERE email=$1", [email]);
        dbClient.release();

        return { rows: res.rows, rowCount: res.rowCount };
    }
}

async function generateId() {
    let exit = false;

    while (exit == false) {
        id = Math.floor(100000 + Math.random() * 900000);

        const userWithId = (await User.getById(id));
        if (userWithId.rowCount == 0) {
            exit = true;
            return id;
        }
    }
}

module.exports = User;