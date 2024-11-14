const db = require("../database")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function create(req, res) {
    const pool = await db.connect()

    const { username, email, password } = req.body

    const conflictedPlayers = await pool.query("SELECT FROM players WHERE username=$1 AND email=$2", [username, email])

    if (conflictedPlayers.rowCount > 0) {
        pool.release()
        return res.json({ error: "Player already exists", statusCode: 69 })
    }
    
    let id = 0
    let playersWithSameId
    do {
        id = parseInt(Math.random() * 10 * parseInt(process.env.SIZEOF_ID))
        console.log(id)
        playersWithSameId = await pool.query("SELECT FROM players WHERE pid=$1", [id])
    } while (playersWithSameId.rowCount != 0)

    const hashedPassword = await bcrypt.hash(password.toString(), parseInt(process.env.PASSWORD_SALT))

    await pool.query("INSERT INTO players VALUES ($1, $2, $3, $4)", [id, username, email, hashedPassword])

    pool.release()

    res.json({ msg: "Player created", statusCode: 333 })
}

async function login(req, res) {
    const pool = await db.connect()

    const { login, password, infoType } = req.body
    

    const player = await pool.query(`SELECT pid, password FROM players WHERE ${infoType}=$1`, [login])

    pool.release()

    if (player.rowCount === 0) {
        return res.json({ error: "Player not found", statusCode: 7 })
    }

    if (!await bcrypt.compare(password.toString(), player.rows[0].password)) {
        return res.json({ error: "Wrong password", statusCode: 123 })
    }

    const token = jwt.sign({ playerId: player.rows[0].pid }, process.env.TOKEN_SECRET, { expiresIn: "45min" })
    res.cookie("token", token, { secure: true, httpOnly: true, maxAge: 2700000 })
    res.json({ msg: "Logged succesfully", statusCode: 111 })
}

async function get(req, res) {
    const pool = await db.connect()

    const { pid } = req.params

    const player = await pool.query("SELECT pid, username FROM players WHERE pid=$1", [pid])
    const playerOrgs = await pool.query("SELECT o.name FROM org_members a JOIN organizations o ON a.oid = o.oid WHERE a.pid = $1", [pid])

    pool.release()

    if (player.rowCount === 0)
        return res.json({ error: "Player not found", statusCode: 7 })

    let result = {
        pid: player.rows[0].pid,
        username: player.rows[0].username,
        email: player.rows[0].email,
        orgs: []
    }

    playerOrgs.rows.forEach((row) => {
        result["orgs"].push({
            name: row.name
        })
    })

    res.json({ player: result, statusCode: 222 })
}

async function getOwn(req, res) {
    const pool = await db.connect()

    const { playerId } = req

    const player = await pool.query("SELECT pid, username, email FROM players WHERE pid=$1", [playerId])
    const playerOrgs = await pool.query("SELECT o.name, o.oid FROM org_members a JOIN organizations o ON a.oid = o.oid WHERE a.pid = $1", [playerId])

    pool.release()

    if (player.rowCount == 0)
        return res.json({ error: "Player not found", statusCode: 7 })

    res.json({ player: player.rows[0], orgs: playerOrgs.rows, statusCode: 222 })
}

async function getAll(req, res) {
    const pool = await db.connect()

    const players = await pool.query("SELECT pid, username FROM players")
    const playersOrgs = await pool.query("SELECT o.name, a.pid FROM associated a JOIN organizations o ON a.oid = o.oid")

    pool.release()

    let result = []

    players.rows.forEach((player) => {
        let i = result.push({
            pid: player.pid,
            username: player.username,
            orgs: []
        })

        playersOrgs.rows.forEach((org) => {
            if (player.pid === org.pid) {
                result[i - 1].orgs.push({
                    name: org.name
                })
            }
        })
    })

    res.json({ players: result, statusCode: 222 })
}

async function edit(req, res) {
    // TODO
}

async function remove(req, res) {
    const pool = await db.connect()

    const { playerId } = req

    const player = await pool.query("SELECT FROM players WHERE pid = $1", [playerId])

    if (player.rowCount === 0) {
        pool.release()
        return res.json({ error: "Player not found", statusCode: 7 })
    }

    await pool.query("DELETE FROM players WHERE pid=$1", [playerId])

    pool.release()

    res.clearCookie("token").json({ msg: "Player deleted", statusCode: 999 })
}

module.exports = {
    create,
    login,
    get,
    getOwn,
    getAll,
    edit,
    remove
}