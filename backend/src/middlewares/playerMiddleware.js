const jwt = require("jsonwebtoken")

async function isLogged(req, res, next) {
    const { token } = req.cookies

    if (!token)
        return res.json({ error: "Access token not found", statusCode: 101 })

    const payload = jwt.verify(token, process.env.TOKEN_SECRET)
    
    if(!payload)
        return res.json({ error: "Token invalid", statusCode: 666})

    req.playerId = payload.playerId

    next()
}

module.exports = {
    isLogged
}