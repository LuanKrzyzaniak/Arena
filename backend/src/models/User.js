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
    const checkedUser = await dbClient.query(
      "SELECT * FROM client WHERE username=$1 OR email=$2",
      [this.username, this.email]
    );

    if (checkedUser.rowCount > 0) {
      let response = {
        statusCode: 409,
        description: "User already exists",
      };

      return response;
    }

    // send to db (query)
    const createUser = await dbClient.query(
      "INSERT INTO client (id, username, pass, email, birthdate) VALUES ($1, $2, $3, $4, $5)",
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
        birthdate: this.birthdate,
      },
    };

    // return response
    return response;
  }

  // Search for user using id
  static async getById(id) {
    const dbClient = await db.connect();
    const res = await db.query(
      "SELECT id, username, email FROM client WHERE id=$1",
      [id]
    );
    dbClient.release();

    return { rows: res.rows, rowCount: res.rowCount };
  }

  static async getByEmail(email) {}

  async verifyLogin(email,password) {
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

  async deleteById(id){
    try{
        const dbClient = db.connect();
        const res = await db.query(
            'DELETE FROM client WHERE id = $1',[id]
        );
        if(res.rowCount > 0){
            return true;
        }
        return false;
    }catch(error){
        console.log(error);
        return false;
    }
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
