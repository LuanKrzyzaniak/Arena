const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const cookieParser = require("cookie-parser");
const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser");

const axios = require('axios');
axios.defaults.withCredentials = true;

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
  }));
app.use(bodyParser.json());

const userRoutes = require("./routes/userRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");


app.use("/user", userRoutes);
app.use("/tournament",tournamentRoutes);

const port = process.env.API_PORT || 3332;

app.listen(port, console.log(`Server running on port: ${port}`));