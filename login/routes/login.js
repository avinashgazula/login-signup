const express = require("express");
const router = express.Router();
var mysql = require("mysql");
var axios = require("axios");

const loginUser = async (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        var conn = mysql.createConnection({
            host: "assignment-2.cvploinv8ffl.us-east-1.rds.amazonaws.com",
            user: "admin",
            password: "password",
            database: "A2",
        });
        conn.connect((err) => {
            if (err) throw err;
            console.log("Connected to MySQL database");
            var sql = `SELECT * FROM Users WHERE email='${email}' and password='${password}'`;
            conn.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                delete result[0]["password"];
                if (result.length) {
                    axios
                        .post("/api/session/login", {
                            email,
                        })
                        .then((resp) => {
                            console.log(resp);
                        })
                        .catch((err) => console.log(err));
                    return res.status(201).json({
                        success: true,
                        user: result,
                    });
                }
                return res.status(201).json({
                    success: false,
                    user: null,
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

router.route("/").post(loginUser);

module.exports = router;
