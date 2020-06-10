const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const register = require("./routes/register");
const login = require("./routes/login");
const session = require("./routes/session");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/register", register);

app.listen(5002);

console.log("Server running on port 5002");