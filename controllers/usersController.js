'use strict';

const connection = require('../config/connection');

const usersController = {
    register: async (req, res) => {
        try {
            return res.status(200).json({ message: "helo dari controller" })
        } catch (err) {
            return res.status(403).json({ message: err })
        }
    },

    login: async (req, res) => {
        try {
            return res.status(200).json({ message: "helo dari controller" })
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

