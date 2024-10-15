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
        birthdate,
        verified
    ) {
        this.id = id;
        this.username = username;
        this.displayname = displayname;
        this.password = password;
        this.email = email;
        this.description = description;
        this.sports = sports;
        this.birthdate = birthdate;
        this.verified = verified;
    }

    // Send new user to database
    // Send new user to database
    async save() {
        const dbClient = await db.connect();

        await dbClient.query(
            'INSERT INTO client (id, username, pass, email, birthdate, verified) VALUES ($1, $2, $3, $4, $5, $6)',
            [this.id, this.username, this.password, this.email, this.birthdate,this.verified]
        );

        dbClient.release();

        return this;
    }

    async update(updateArrayInfo) {
        const dbClient = await db.connect();
        let updateQueryArray = [];

        for (let i = 0; i < updateArrayInfo.length; i++) {
            if (updateArrayInfo[i].new)
                updateQueryArray.push(updateArrayInfo[i].new);
            else
                updateQueryArray.push(updateArrayInfo[i].old);
        }
        updateQueryArray.push(this.id);

        await dbClient.query(`UPDATE client SET username=$1, displayname=$2, email=$3, birthdate=$4  WHERE id=$5`, updateQueryArray);

        dbClient.release();
    }

    // Search for user using id
    static async getById(id) {
        const dbClient = await db.connect();
        const res = await db.query("SELECT * FROM client WHERE id=$1", [id]);
        dbClient.release();

        if (res.rowCount == 0)
            return null;

        let user = res.rows[0];
        return new User(user.id,
            user.username,
            user.displayname,
            user.pass,
            user.email,
            user.description,
            user.sports,
            user.birthdate
        );
    }

    static async getByEmail(email) {
        const dbClient = await db.connect();
        const res = await db.query("SELECT * FROM client WHERE email=$1", [email]);
        dbClient.release();

        let user = res.rows[0];
        return new User(user.id,
            user.username,
            user.displayname,
            user.pass,
            user.email,
            user.description,
            user.sports,
            user.birthdate
        );
    }

    static async getByUsername(username) {
        const dbClient = await db.connect();
        const res = await db.query("SELECT * FROM client WHERE username=$1", [username]);
        dbClient.release();

        let user = res.rows[0];
        return new User(user.id,
            user.username,
            user.displayname,
            user.pass,
            user.email,
            user.description,
            user.sports,
            user.birthdate
        );
    }

    async verifyLogin(email, password) {
        try {
            const dbClient = db.connect();
            const res = await db.query(
                "SELECT email,pass FROM client WHERE email = $1",
                [email]
            );

            const hashed = res.rows[0].pass;
            let isValid = await bcrypt.compare(password, hashed);
            if (isValid) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteById(id) {
        try {
            const dbClient = db.connect();
            const res = await db.query(
                'DELETE FROM client WHERE id = $1', [id]
            );
            if (res.rowCount > 0) {
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = User;
