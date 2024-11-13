const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

const port = process.env.API_PORT

app.use(cors())
app.use(express.json())
app.use(cookieParser())

const userMiddleware = require("./middlewares/playerMiddleware")
const playerRoutes = require("./routes/playerRoutes")
const organizationRoutes = require("./routes/organizationRoutes")
const tournamentRoutes = require("./routes/tournamentRoutes")

app.use("/player", playerRoutes)
app.use("/organization", userMiddleware.isLogged, organizationRoutes)
app.use("/tournament", userMiddleware.isLogged, tournamentRoutes)

app.listen(port, console.log(`Server running on port ${port}`))