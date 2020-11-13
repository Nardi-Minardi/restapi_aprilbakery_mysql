const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('../config/db');

const usersController = {
    register: async (req, res) => {
        try {

            const { password } = req.body;

            // password encryption
            const hashPassword = await bcrypt.hash(password, 10)

            // create new objet user
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashPassword
            })

            //save to database
            await User.create(user)
            return res.status(200).json({
                message: "Register Success",
                data: user
            })

        } catch (err) {
            return res.status(403).json({ message: err })
        }
    },

    login: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;

            sql.query('SELECT * FROM tb_users WHERE email = ?', [email], async function (error, rows, fields) {
                if (error) {
                    return res.status(400).json({
                        message: "inputan anda salah",
                    })
                } else {
                    if (rows.length > 0) {
                        const comparision = await bcrypt.compare(password, rows[0].password)
                        const accesstoken = jwt.sign({ rows }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
                        if (comparision) {
                            return res.status(200).json({
                                message: "login success",
                                token: accesstoken
                            })
                        }
                        else {
                            return res.status(200).json({
                                message: "password anda salah",
                            })
                        }
                    }
                    else {
                        return res.status(200).json({
                            message: "email tidak terdaftar",
                        })
                    }
                }
            });

        } catch (err) {
            return res.status(403).json({ message: err })
        }
    },

    getUsers: async (req, res) => {
        try {
            connection.query("SELECT * FROM tb_users", function (error, rows, fields) { //kirim 3 parameter
                return res.status(200).json({
                    message: "Success !",
                    data: rows
                })
            })

        } catch (err) {
            return res.status(403).json({ message: err })
        }
    },

    getUsersById: async (req, res) => {
        try {
            const id = req.params.id;

            connection.query("SELECT * FROM tb_users WHERE id = ?", [id], function (error, rows, fields) {
                return res.status(200).json({
                    message: "Success !",
                    data: rows
                })
            })

        } catch (err) {
            return res.status(403).json({ message: err })
        }
    },

}


module.exports = usersController

