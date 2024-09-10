const db = require("../database");

class User {
    constructor(
        userId,
        username,
        displayname,
        password,
        email,
        description,
        sports,
        birthdate
    ) {
        this.userId = userId;
        this.username = username;
        this.displayname = displayname;
        this.password = password;
        this.email = email;
        this.description = description;
        this.sports = sports;
        this.birthdate = birthdate;
    }

    // Send new user to database
    async save() {
        // generate id
        // encrypt password

        const client = await db.connect();
        // send to db (query)
        client.release();

        // create response
        // return response
    }

    // Search for user using id
    static getById(id) {

    }

    static getByEmail(email) {

    }
}

module.exports = User;