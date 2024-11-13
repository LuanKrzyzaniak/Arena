const db = require("../database")

async function isOwner(req, res, next) {
    // TODO
    // logged player is owner of organization owner of tournament
    const pool = await db.connect()

    const { playerId } = req
    const { tid } = req.params

    const tournamentOrg = await pool.query("SELECT owner FROM tournaments WHERE tid = $1", [tid])

    if (tournamentOrg.rowCount === 0) {
        pool.release()
        return res.json({ error: "Tournament not found", statusCode: 7 })
    }

    const playerOrgAssociationType = await pool.query("SELECT type FROM associated a WHERE a.oid = $1 AND a.pid = $2", [tournamentOrg.rows[0].owner, playerId])

    pool.release()

    if (playerOrgAssociationType.rowCount === 0) {
        return res.json({ error: "This player isn't member of organization", statusCode: 1 })
    }

    if (playerOrgAssociationType.rows[0].type == "owner") {
        req.org = tournamentOrg.rows[0].owner
        next()
    }
    else
        res.json({ error: "Player isn't owner of organization", statusCode: 1 })
}

module.exports = {
    isOwner
}