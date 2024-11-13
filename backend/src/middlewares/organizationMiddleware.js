const db = require("../database")

async function isOwner(req, res, next) {
    const pool = await db.connect()

    const { playerId } = req
    const { oid } = req.params

    const owner = await pool.query("SELECT type FROM associated WHERE oid = $1 AND pid = $2", [oid, playerId])

    pool.release()

    if (owner.rowCount === 0)
        return res.json({ error: "Player not found in organization registry", statusCode: 7 })

    if (owner.rows[0].type === "owner")
        next()
    else
        return res.json({ error: "Player isn't organization owner", statusCode: 1 })
}

module.exports = {
    isOwner
}