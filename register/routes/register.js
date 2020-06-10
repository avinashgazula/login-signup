const express = require("express");
const router = express.Router();
var mysql = require("mysql");

const registerUser = async (req, res, next) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        console.log(name);
        console.log(email);
        console.log(password);

        var conn = mysql.createConnection({
            host: "assignment-2.cvploinv8ffl.us-east-1.rds.amazonaws.com",
            user: "admin",
            password: "password",
            database: "A2",
            multipleStatements: true,
        });
        conn.connect((err) => {
            if (err) throw err;
            console.log("Connected to MySQL database");
            var sql = `INSERT INTO Users (name, email, password) VALUES ('${name}', '${email}', '${password}');INSERT INTO Session(email, time, status) VALUES('${email}', now(), 'offline');`;
            conn.query(sql, function (err, result) {
                if (err) throw err;
                return res.status(201).json({
                    success: true,
                });
            });
        });
    } catch (err) {
        return res.status(404).json({
            success: false,
            error: "Server error",
        });
    }
};

router.route("/").post(registerUser);

module.exports = router;
