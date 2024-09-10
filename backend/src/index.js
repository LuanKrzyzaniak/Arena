require("dotenv").config();
const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const userRoutes = require("./routes/userRoutes");

app.use("/user", userRoutes);

const port = process.env.API_PORT || 3332;

app.listen(port, console.log(`Server running on port: ${port}`));