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
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: hashPassword
            }

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
            User.getAll((err, rows) => {
                if (err)
                    res.status(400).send({
                        message:
                            err.message || "Some error occurred while retrieving user."
                    });
                else res.status(200).json({ message: "success", data: rows })
            });

        } catch (err) {
            return res.status(403).json({ message: err })
        }
    },

    getUsersById: async (req, res) => {
        try {
            User.findOne(req.params.id, (err, rows) => {
                if (err) {
                    if (err.kind === "not found") {
                        res.status(403).json({
                            message: `users not found with id ${req.params.id}`
                        });
                    } else {
                        res.status(500).json({
                            message: "error retrieving User with id" + req.params.id
                        });
                    }
                } else {
                    res.status(200).json({ message: "success", data: rows })
                }
            })

        } catch (err) {
            return res.status(403).json({ message: err })
        }
    },

    updateUsers: async (req, res) => {
        try {
            if (!req.body) {
                res.status(400).json({
                    message: "Content can not be empty!"
                });
            }
            const { password } = req.body;

            const hashPassword = await bcrypt.hash(password, 10)

            const user = {
                username: req.body.username,
                email: req.body.email,
                password: hashPassword
            }

            User.updateById(req.params.id, user, (err, rows) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).json({
                            message: `Not found User with id ${req.params.id}.`
                        });
                    } else {
                        res.status(400).json({
                            message: "Error updating User with id " + req.params.id
                        });
                    }
                } else
                    (rows.length === 1) // kondisi agar data yang diupdate di menambah data baru
                res.status(200).json({ message: "success updated", data: rows })
            }
            )

        } catch (err) {
            return res.status(403).json({ message: err })
        }
    }
}


module.exports = usersController

