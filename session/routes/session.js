const express = require("express");
const router = express.Router();
var mysql = require("mysql");

const loginUser = async (req, res, next) => {
    try {
        let email = req.body.email;
        var conn = mysql.createConnection({
            host: "assignment-2.cvploinv8ffl.us-east-1.rds.amazonaws.com",
            user: "admin",
            password: "password",
            database: "A2",
        });
        conn.connect((err) => {
            if (err) throw err;
            console.log("Connected to MySQL database");
            var sql = `UPDATE Session set status='online' where email='${email}'`;
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

const logoutUser = async (req, res, next) => {
    try {
        let email = req.body.email;
        var conn = mysql.createConnection({
            host: "assignment-2.cvploinv8ffl.us-east-1.rds.amazonaws.com",
            user: "admin",
            password: "password",
            database: "A2",
        });
        conn.connect((err) => {
            if (err) throw err;
            console.log("Connected to MySQL database");
            var sql = `UPDATE Session set status='offline' where email='${email}'`;
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

const getActiveUsers = (req, res, next) => {
    try {
        var conn = mysql.createConnection({
            host: "assignment-2.cvploinv8ffl.us-east-1.rds.amazonaws.com",
            user: "admin",
            password: "password",
            database: "A2",
        });
        conn.connect((err) => {
            if (err) throw err;
            console.log("Connected to MySQL database");
            var sql = `SELECT * FROM Session WHERE status='online'`;
            conn.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                if (result.length) {
                    return res.status(201).json({
                        success: true,
                        users: result,
                    });
                }
                return res.status(202).json({
                    success: true,
                    user: [],
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

router.route("/logout").post(logoutUser);
router.route("/activeusers").get(getActiveUsers);

module.exports = router;
