const db = require("../database")

async function create(req, res) {
    const pool = await db.connect()

    const { playerId } = req
    const { name } = req.body

    const conflictedOrgs = await pool.query("SELECT FROM organizations WHERE name = $1", [name])

    if (conflictedOrgs.rowCount > 0) {
        pool.release();
        return res.json({ error: "Organization name already in use", statusCode: 69 })
    }

    let id = 0
    let orgsWithSameId
    do {
        id = parseInt(Math.random() * 10 ** parseInt(process.env.SIZEOF_ID))

        orgsWithSameId = await pool.query("SELECT FROM organizations WHERE oid = $1", [id])
    } while (orgsWithSameId.rowCount != 0)

    await pool.query("INSERT INTO organizations VALUES ($1, $2, $3)", [id, name, playerId])
    await pool.query("INSERT INTO associated VALUES ($1, $2, $3)", [id, playerId, "owner"])

    pool.release()

    res.json({ msg: "Organization created", statusCode: 333 })
}

async function get(req, res) {
    const pool = await db.connect()

    const { oid } = req.params

    const organization = await pool.query("SELECT o.oid, o.name, o.owner FROM organizations o WHERE o.oid = $1", [oid])
    const orgSports = await pool.query("SELECT s.name FROM org_sports os JOIN sports s ON os.sid = s.sid WHERE os.oid = $1", [oid])
    const orgPlayers = await pool.query("SELECT p.username, a.type FROM associated a JOIN players p ON a.pid = p.pid WHERE a.oid = $1", [oid])

    let response = {
        oid: organization.rows[0].oid,
        name: organization.rows[0].name,
        owner: organization.rows[0].owner,
        sports: [],
        players: []
    };

    orgSports.rows.forEach((row) => {
        response["sports"].push({
            name: row.name
        })
    })

    orgPlayers.rows.forEach((row) => {
        response["players"].push({
            name: row.username,
            type: row.type
        })
    })

    pool.release()

    if (organization.rowCount === 0)
        return res.json({ error: "Organization not found", statusCode: 7 })

    res.json({ organization: response, statusCode: 222 })
}

async function getAll(req, res) {
    const pool = await db.connect()

    const organization = await pool.query("SELECT o.oid, o.name, o.owner, p.username FROM organizations o JOIN players p ON o.owner = p.pid")
    const orgSports = await pool.query("SELECT s.name, os.oid FROM org_sports os JOIN sports s ON os.sid = s.sid")
    const orgPlayers = await pool.query("SELECT p.pid, p.username, a.type, a.oid FROM associated a JOIN players p ON a.pid = p.pid")

    pool.release()

    let result = []

    organization.rows.forEach((org) => {
        let i = result.push({
            oid: org.oid,
            name: org.name,
            owner: {
                pid: org.owner,
                username: org.username
            },
            sports: [],
            members: []
        })

        orgSports.rows.forEach((sport) => {
            if (org.oid === sport.oid) {
                result[i - 1].sports.push({
                    name: sport.name
                })
            }
        })

        orgPlayers.rows.forEach((player) => {
            if (org.oid === player.oid) {
                result[i - 1].members.push({
                    pid: player.pid,
                    username: player.username,
                    memberType: player.type
                })
            }
        })
    })

    res.json({ orgs: result, statusCode: 222 })
}

async function remove(req, res) {
    const pool = await db.connect()

    const { oid } = req.params

    const org = await pool.query("SELECT FROM organizations o WHERE o.oid = $1", [oid])

    if (org.rowCount === 0) {
        pool.release()
        return res.json({ error: "Organization not found", statusCode: 7 })
    }

    await pool.query("DELETE FROM associated WHERE oid = $1", [oid])
    await pool.query("DELETE FROM org_sports WHERE oid = $1", [oid])
    await pool.query("DELETE FROM organizations WHERE oid = $1", [oid])

    pool.release()

    res.json({ msg: "Organization deleted", statusCode: 999 })
}

async function addSport(req, res) {
    const pool = await db.connect()

    const { oid, sid } = req.params

    const orgAndSport = await pool.query("SELECT FROM organizations o, sports s WHERE o.oid = $1 AND s.sid = $2", [oid, sid])

    if (orgAndSport.rowCount === 0) {
        pool.release()
        return res.json({ error: "Organization or sport not found", statusCode: 7 })
    }

    const conflictedRelations = await pool.query("SELECT FROM org_sports WHERE oid = $1 AND sid = $2", [oid, sid])
    if (conflictedRelations.rowCount > 0) {
        pool.release()
        return res.json({ error: "Sport already added to organization", statusCode: 69 })
    }

    await pool.query("INSERT INTO org_sports VALUES ($1, $2)", [oid, sid])

    pool.release()

    res.json({ msg: "Sport added to organization", statusCode: 666 })
}

async function removeSport(req, res) {
    const pool = await db.connect()

    const { oid, sid } = req.params

    const orgAndSport = await pool.query("SELECT FROM org_sports os WHERE os.oid = $1 AND os.sid = $2", [oid, sid])

    if (orgAndSport.rowCount === 0) {
        pool.release()
        return res.json({ error: "Sport isn't added to organization", statusCode: 7 })
    }

    await pool.query("DELETE FROM org_sports WHERE oid = $1 AND sid = $2", [oid, sid])

    pool.release()

    res.json({ msg: "Sport removed from organization", statusCode: 999 })
}

async function addPlayer(req, res) {
    const pool = await db.connect()

    const { oid, pid } = req.params
    const { type } = req.body

    const orgAndPlayer = await pool.query("SELECT FROM organizations o, players p WHERE o.oid = $1 AND p.pid = $2", [oid, pid])

    if (orgAndPlayer.rowCount === 0) {
        pool.release()
        return res.json({ error: "Organization or player not found", statusCode: 7 })
    }

    const conflictedRelations = await pool.query("SELECT FROM associated WHERE oid = $1 AND pid = $2", [oid, pid])
    if (conflictedRelations.rowCount > 0) {
        pool.release()
        return res.json({ error: "Player already added to organization", statusCode: 69 })
    }

    await pool.query("INSERT INTO associated VALUES ($1, $2, $3)", [oid, pid, type])

    pool.release()

    res.json({ msg: "Player added to organization", statusCode: 666 })
}

async function removePlayer(req, res) {
    const pool = await db.connect()

    const { oid, pid } = req.params

    const orgAndPlayer = await pool.query("SELECT FROM associated os WHERE oid = $1 AND pid = $2", [oid, pid])

    if (orgAndPlayer.rowCount === 0) {
        pool.release()
        return res.json({ error: "Player isn't added to organization", statusCode: 7 })
    }

    await pool.query("DELETE FROM associated WHERE oid = $1 AND pid = $2", [oid, pid])

    pool.release()

    res.json({ msg: "Player removed from organization", statusCode: 999 })
}

module.exports = {
    create,
    get,
    getAll,
    remove,
    addSport,
    removeSport,
    addPlayer,
    removePlayer
}