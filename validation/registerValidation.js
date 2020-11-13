const { check, validationResult } = require('express-validator');
const sql = require('../config/db');

const registerValidation = () => [
    check('username', 'username tidak boleh kosong').notEmpty(),
    check('email', 'email tidak boleh kosong').notEmpty().matches(/.+\@.+\..+/).withMessage('Format Email Salah'),
    check('password', 'Password tidak boleh kosong').notEmpty().isLength({ min: 6 }).withMessage('Password Minimal 6 Characters'),

    check('username').custom(value => {
        return new Promise((resolve, reject) => {
            sql.query('SELECT userId FROM tb_users WHERE username=?', [value], function (err, rows, fields) {
                if (err)
                    reject(err)
                if (rows.length > 0)
                    reject(new Error('username sudah terdaftar'))
                resolve()
            })
        })
    }),

    check('email').custom(value => {
        return new Promise((resolve, reject) => {
            sql.query('SELECT userId FROM tb_users WHERE email=?', [value], function (err, rows, fields) {
                if (err)
                    reject(err)
                if (rows.length > 0)
                    reject(new Error('Email sudah digunakan'))
                resolve()
            })
        })
    }),
]

const runValidation = (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg
            })
        }
        next();
    } catch (err) {
        return res.status(403).json({ message: err.message })
    }
}

module.exports = {
    add: [
        registerValidation(),
        runValidation
    ]
}