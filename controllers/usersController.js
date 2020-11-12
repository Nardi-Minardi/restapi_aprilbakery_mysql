const User = require('../models/usersModel');
const bcrypt = require('bcrypt');

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

